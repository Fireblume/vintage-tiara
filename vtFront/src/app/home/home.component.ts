import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { HomeService } from './home.service';
import { ModalService} from '../modal.service';
import { CartService } from '../cart/cart.service';
import { BaseService } from '../base/base.service';

import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ZoomElement } from '../Event';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Globals } from '../Globals'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private homeService: HomeService, private route: ActivatedRoute,
  private modalService: ModalService, public firebaseApp: FirebaseApp, private _firebaseAuth: AngularFireAuth, private slimLoadingBarService: SlimLoadingBarService, private cartService: CartService,
  private global: Globals, private baseService: BaseService) { 

    this.subscription = this.baseService.getSearch().subscribe(
      message => { 
        this.products = message; 
        this.slimLoadingBarService.complete();
      });

     this.route.parent.data.subscribe((auth) => {
      auth.base.auth.subscribe(res =>{
        if(res != null)
          this.userUid = res.uid;
        else
          this.userUid = undefined;

        this.homeService.cartCount(this.userUid)
            .subscribe((cnt:number) => {this.global.countCart = cnt})

        this.prepareLikedItem(this.userUid);
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

      this.route.parent.data.subscribe((auth) => {
      auth.base.products.subscribe(res =>{
        if(res != null)
            this.fullProductList = res;
        })
      })

      this.route.parent.data.subscribe((auth) => {
      auth.base.newAsale.subscribe(res =>{
        if(res != null)
            this.products = res;
        })
      })
  }

  @ViewChild('modalPP') public modalPP: ZoomElement;
  subscription: Subscription;

  modalImage: any = [];
	categories: any = [];
  products: any = [];
  subcategories: any = [];
  likedItems: any = [];
  fullProductList: any = [];
  subctgs: any = [];
  showProduct: any;
  maxQuantity: any;
  error: any;
  userUid:any;
  quantityProblem:boolean;
	images:any;
  myThumbnail:any = '';
  hovered:any = {};
  quantityToBuy:number = 1;
  hearClick:any = {};
  addBtnTxt:any ='U KORPU';
  clicked:any = {};
  differ: any;
  priceOnSale:number = 0;

	ngOnInit() {   
  }

  showProducts(subCId){
    //this.slimLoadingBarService.start();
    this.products = this.fullProductList.filter(function(ele){
      return ele.subcategoryid == subCId;
    })

    /*this.homeService.getProducts(subCId).subscribe(
      (res) => {
        this.products = res;
        this.slimLoadingBarService.complete();
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
        this.slimLoadingBarService.complete();
    }); */
  }

  openModal(id, product) {
      var img = new Image;
      this.priceOnSale = 0;
      
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
    if(product.active == 'Y')
      this.showProduct.inStock = 'DOSTUPNO';
    else
      this.showProduct.inStock = 'NEDOSTUPNO';

    this.likedItems.forEach(like =>{
      if(like.productid == product.id)
        this.hearClick[product.id] = true;
    })

    if(product.onsale == 'Y'){
      this.priceOnSale = product.price - (product.price*product.sale/100);
    }

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

  likeProduct(productKey){
    this.homeService.likeProduct(productKey).subscribe((res:any) =>{
      if(res.resp == 'OK'){
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  dislikeProduct(productid){
    this.homeService.removeLike(productid).subscribe((res:any) =>{
      if(res.resp == 'OK'){
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  toCart(productId, quantity){
    this.slimLoadingBarService.start();
    this.homeService.toCart(productId, quantity).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.addBtnTxt = "DODATO!";
        this.global.countCart = this.global.countCart + 1;
        setTimeout(()=>{
            this.addBtnTxt = "U KORPU";
        }, 3000);
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  prepareLikedItem(uid){
    this.cartService.getLikedItems(uid).subscribe(
    (res) => {
        this.likedItems = res;
        this.slimLoadingBarService.complete();
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
        this.slimLoadingBarService.complete();
    });
  }

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
