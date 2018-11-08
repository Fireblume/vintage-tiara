import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { HomeService } from './home.service';
import { ModalService} from '../modal.service';

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
  	private modalService: ModalService, public firebaseApp: FirebaseApp, private _firebaseAuth: AngularFireAuth, private slimLoadingBarService: SlimLoadingBarService) { 
      this._firebaseAuth.authState.subscribe((auth) => {
            try{
              this.userUid = auth.uid;
            }catch(Exception){}
      });
    }

    @ViewChild('modalPP') public modalPP: ZoomElement;

    modalImage: any = [];
  	categories: any = [];
    products: any = [];
    showProduct: any;
    maxQuantity: any;
    userUid:any;
    quantityProblem:boolean;
  	images:any;
    myThumbnail:any = '';
    hovered:any = {};
    quantityToBuy:number = 1;

	ngOnInit() {
    
    this.prepareCategoriesAndSubCtg();
    
  }

  showProducts(subCId){
    this.slimLoadingBarService.start();
    let products = JSON.parse(sessionStorage.getItem("products"));
    let prodSet: any = [];
    products.forEach(val => {
            if(subCId == val.parentId){
              prodSet.push(val);
            }
          })

    this.products = prodSet;
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
    this.homeService.likeProduct(productKey);
  }

  toCart(productKey, quantity){
     this.homeService.toCart(productKey, quantity);
  }

  prepareCategoriesAndSubCtg(){
  this.slimLoadingBarService.start();
    this.route.snapshot.data.home.categories.subscribe(
      (res) => {
         this.categories = this.object_to_ctg(res[0].value);

          this.route.snapshot.data.home.subctg.subscribe(
            (res2) => {
               let subctgs = this.object_to_subctg_prod(res2[0].value);
               
               this.categories.forEach(val => { 
                  let subcSet:any = [];

                  subctgs.forEach(val2 => { 
                    if(val.key == val2.parentId)
                      subcSet.push(val2);
                  })

                  val.subctgs = subcSet;
               })

            this.slimLoadingBarService.complete();
          })
    })
  }

  object_to_ctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        map[k].key = k;
        categories.push(map[k]);
    }

    return categories;
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
