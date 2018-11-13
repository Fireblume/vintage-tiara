import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { FileReaderEvent } from '../Event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService: DashboardService, private _firebaseAuth: AngularFireAuth, 
  public db: AngularFireDatabase, public ng2ImgMax: Ng2ImgMaxService, private slimLoadingBarService: SlimLoadingBarService) {
      
  }

  @ViewChild('ctgInput') public ctgInput: ElementRef;
  @ViewChild('subCtgInput') public subCtgInput: ElementRef;
  @ViewChild('feedbackMsg') public feedbackMsg: ElementRef;

	categories:any;
	subCatgs:any;
  products:any;

  product:any = {};
  category: any = {};
  subCatg:any = {};
  error:any;
  categoryId:any;

  vDeleteCtg:any;
  vDeleteSubCtg:any;
  vDeleteProd:any;
  forDeleting:any;

  selectedC:any = {};
  selectedS:any = {};
  selectedP:any = {};

  fdbMessage:any;

  ngOnInit() {
  	this.getCategory();
  }

  getCategory(){
    this.slimLoadingBarService.start();
  	this.dashService.getCategories().subscribe(
      (res) => {
        this.categories = res;
        this.slimLoadingBarService.complete();
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
            this.slimLoadingBarService.complete();
            console.log(error)
          });
  }

  getSubCat(catId){
    this.slimLoadingBarService.start();
  	this.dashService.getSubCategories(catId).subscribe(
      (res) => {
        this.subCatgs = res;
        this.slimLoadingBarService.complete();
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
            this.slimLoadingBarService.complete();
            console.log(error)
          });
    }

  getProducts(subCtgId){
    this.slimLoadingBarService.start();
    this.dashService.getProducts(subCtgId).subscribe(
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
            console.log(error)
          });
  }

  submitCatg(category){
    this.slimLoadingBarService.start();
    this.dashService.saveCategory(category).then(
      () =>{this.slimLoadingBarService.complete();}
    );
  }

  submitProduct(product){
    this.slimLoadingBarService.start();
    const pushId = this.db.createPushId();
    product.photo = this.product.photo;
    if(product.photo != undefined)
      this.ng2ImgMax.resizeImage(product.photo, 800, 800).subscribe(
          result => {
            var reader: FileReader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = (event: FileReaderEvent) => {
              let element = event.target.result
              product.photo = element;
              console.log(product)
              //product.photo = e.target.result;
              this.dashService.saveProduct(product, pushId).then(() =>{
              this.slimLoadingBarService.complete();
              });
            }
           }, 
           error => {
             console.log('😢 Oh no!', error);
          });   
    else
      this.dashService.saveProduct(product, pushId).then(() =>{this.slimLoadingBarService.complete();});
  }

  submitSubctg(subCat){
    this.slimLoadingBarService.start();
    this.dashService.saveSubCateg(subCat).then(
      () =>{this.slimLoadingBarService.complete();}
      );
  }

  fillFormC(category){
    this.category.uidC = category.key;
    this.category.title = category.value.title;
    this.category.isActive = category.value.active;
  }

  fillFormS(subCat){
    this.subCatg.uidS = subCat.key;
    this.subCatg.subtitle = subCat.value.title;
    this.subCatg.isActiveS = subCat.value.active;
    this.subCatg.categoryId = subCat.parentId;
    this.categoryId = subCat.parentId;

    this.ctgInput.nativeElement.disabled = true;
  }

  fillFormP(prod){
    this.product.uidP = prod.key;
    this.product.prodtitle = prod.value.title;
    this.product.desc = prod.value.description;
    this.product.quantity = prod.value.quantity;
    this.product.color = prod.value.color;
    this.product.price = prod.value.price;
    this.product.isAvailable = prod.value.available;
    this.product.subCtgId = prod.parentId;

    this.subCtgInput.nativeElement.disabled = true;
  }

  cleanCatgForm() {
    this.selectedC = {};
    this.category = {};
    this.subCatgs = [];
    this.selectedS = {};
  }

  cleanSubForm(){
    this.selectedS = {};
    this.subCatg = {};
    this.ctgInput.nativeElement.disabled = false;
  }

  cleanProdForm(){
    this.product = {};
    this.subCtgInput.nativeElement.disabled = false;
    (<HTMLInputElement>window.document.getElementById('photoPick')).value = "";
  }

  selectActiveC(key){
    this.selectedC = {};
    this.selectedC[key] = true;
  }

  selectActiveS(key){
    this.selectedS = {};
    this.selectedS[key] = true;
  }

  selectFile(event) {
    const file = event.target.files.item(0);
  
    if (file.type.match('image.*')) {
      this.product.photo = file;
      console.log(this.product)
    } else {
      alert('invalid format!');
    }
  }

  removeCategory(){
    this.dashService.removeCateg(this.forDeleting);
  }

  removeSubctg(){
    this.dashService.removeSubctg(this.forDeleting);
  }

  removeProd(){
    this.dashService.removeProd(this.forDeleting);
  }

  dialogCatg(catg){
    this.vDeleteCtg = !this.vDeleteCtg
    this.forDeleting = catg;
  }

  dialogSubCatg(sub){
    this.vDeleteSubCtg = !this.vDeleteSubCtg
    this.forDeleting = sub;
  }

  dialogProd(prod){
    this.vDeleteProd = !this.vDeleteProd;
    this.forDeleting = prod;

  }

}
