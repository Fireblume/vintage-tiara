import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { HomeService } from './home.service';
import { ModalService} from '../modal.service';
import { CartService } from '../cart/cart.service';

import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ZoomElement } from '../Event';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private homeService: HomeService, private route: ActivatedRoute,
  private modalService: ModalService, public firebaseApp: FirebaseApp, private _firebaseAuth: AngularFireAuth, private slimLoadingBarService: SlimLoadingBarService, private cartService: CartService) { 
     this.route.parent.data.subscribe((auth) => {
      auth.base.auth.subscribe(res =>{
        if(res != null)
          this.userUid = res.uid;
        else
          this.userUid = undefined;

        this.prepareLikedItem(this.userUid);
      });
      
    });

    this.route.parent.data.subscribe((auth) => {
      auth.base.adminId.subscribe(res =>{
        if(res != null)
          this.amidnUid = res[0].key;
        else
          this.amidnUid = undefined;
      });
    });

    this.slimLoadingBarService.start();
    this.route.parent.data.subscribe((auth) => {
      auth.base.menuItems.subscribe(res =>{
        if(res != null)
            this.categories = res;
        this.slimLoadingBarService.complete();
        })
      })
  }

  @ViewChild('modalPP') public modalPP: ZoomElement;

  modalImage: any = [];
	categories: any = [];
  products: any = [];
  subcategories: any = [];
  likedItems: any = [];
  fullProductList: any = [];
  subctgs: any = [];
  showProduct: any;
  maxQuantity: any;
  userUid:any;
  amidnUid: any;
  quantityProblem:boolean;
	images:any;
  myThumbnail:any = '';
  hovered:any = {};
  quantityToBuy:number = 1;
  hearClick:any = {};

	ngOnInit() {   
  }

  showProducts(subCId){
    this.slimLoadingBarService.start();
    this.fullProductList.forEach(val => {
      if(subCId == val.key){
        this.products = this.convert_object(val);
      }
    })
    this.slimLoadingBarService.complete();
  }

  openModal(id, product) {
      var img = new Image;
      
      img.onload = (function(modalPP) {
        return function(){
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = 400;
            canvas.height = 400;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, 400, 400);

            var dataURI = canvas.toDataURL();
            modalPP.thumbImage = dataURI;
        };
      })(this.modalPP)

    img.src = product.photo;
    this.modalImage = product.photo
    this.showProduct = product;
    if(product.available == 'true')
      this.showProduct.inStock = 'DOSTUPNO';
    else
      this.showProduct.inStock = 'NEDOSTUPNO';

    this.likedItems.forEach(like =>{
      if(like.value.productKey == product.key)
        this.hearClick[product.key] = true;
    })

    this.maxQuantity = parseInt(this.showProduct.quantity);

    this.modalService.open(id);
  }
 
  closeModal(id: string) {
      this.modalService.close(id);
  }

  onQChange(value){
    if(value < 1 || value > this.maxQuantity)
      this.quantityProblem = true;
    else
      this.quantityProblem = false;
  }

  likeProduct(parentId, productKey){
    this.homeService.likeProduct(parentId, productKey);
  }

  dislikeProduct(productKey){
    this.homeService.removeLike(productKey);
  }

  toCart(parentId, productId, quantity){
     this.homeService.toCart(parentId, productId, quantity);
  }

  prepareDataLists(adminId){
    this.slimLoadingBarService.start();
    this.homeService.getProducts(adminId).subscribe(res => {
      this.fullProductList = res;
    })
  }

  prepareLikedItem(uid){
    this.cartService.getLikedItems(uid).subscribe(res => {
        this.likedItems = res;
    });
  }

  object_to_ctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        map[k].key = k;
        categories.push(map[k]);
    }

    return categories;
  }

  convert_object(map) {
    let obj: any = []
    for (let k of Object.keys(map.value)) {
        map.value[k].key = k;
        map.value[k].parentId = map.key;
        obj.push(map.value[k]);
    }

    return obj;
  }

  object_to_subctg_prod(map) {
    let result: any = []
    for (let k of Object.keys(map)) {
        for (let j of Object.keys(map[k])) {
            map[k][j].key = j;
            map[k][j].parentId = k;
            result.push(map[k][j]);
        }
    }

    return result;
  }
}
