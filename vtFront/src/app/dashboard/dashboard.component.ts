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

	categories:any = [];
	subCatgs:any = [];
  products:any = [];

  product:any = {};
  category: any = {};
  subCatg:any = {};
  error:any;

  vDeleteCtg:any;
  vDeleteSubCtg:any;
  vDeleteProd:any;
  forDeleting:any;

  selectedC:any = {};
  selectedS:any = {};
  selectedP:any = {};

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

  submitCatg(){
    this.slimLoadingBarService.start();
    this.dashService.saveCategory(this.category).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.getCategory();
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  submitProduct(){
    this.slimLoadingBarService.start();
    if(this.product.photo != undefined)
      this.ng2ImgMax.resizeImage(this.product.photo, 800, 800).subscribe(
          result => {
            var reader: FileReader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = (event: FileReaderEvent) => {
              let element = event.target.result
              this.product.photo = element;
              this.dashService.saveProduct(this.product).subscribe((res:any) =>{
                if(res.resp == 'OK'){
                  this.getProducts(this.product.subcategoryid);
                } else
                  this.error = "Greška!";

                  this.slimLoadingBarService.complete();
              });
            }
           }, 
           error => {
             console.log('😢 Oh no!', error);
          });   
    else
      this.dashService.saveProduct(this.product).subscribe((res:any) =>{
                if(res.resp == 'OK'){
                  this.getProducts(this.product.subcategoryid);
                } else
                  this.error = "Greška!";

                  this.slimLoadingBarService.complete();
              });
  }

  submitSubctg(){
    this.slimLoadingBarService.start();
    this.dashService.saveSubCateg(this.subCatg).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.getSubCat(this.subCatg.categoryid);
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  fillFormC(category){
    this.category.id = category.id;
    this.category.title = category.title;
    this.category.active = category.active;
  }

  fillFormS(subCat){
    this.subCatg.id = subCat.id;
    this.subCatg.title = subCat.title;
    this.subCatg.active = subCat.active;
    this.subCatg.categoryid = subCat.categoryid;

    this.ctgInput.nativeElement.disabled = true;
  }

  fillFormP(prod){
    this.product.id = prod.id;
    this.product.title = prod.title;
    this.product.description = prod.description;
    this.product.quantity = prod.quantity;
    this.product.color = prod.color;
    this.product.price = prod.price;
    this.product.active = prod.active;
    this.product.subcategoryid = prod.subcategoryid;
    this.product.photo = prod.photo;
    this.product.newest = prod.newest;
    this.product.onsale = prod.onsale;
    this.subCtgInput.nativeElement.disabled = true;

    if(prod.sale == null)
      this.product.sale = 0;
    else
      this.product.sale = prod.sale;
  }

  cleanCatgForm() {
    this.category = {};
  }

  cleanSubForm(){
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
    } else {
      alert('invalid format!');
    }
  }

  removeCategory(){
    this.dashService.removeCateg(this.forDeleting.id).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.products = this.removeFromSubctgProd(this.subCatgs, this.products);
        this.subCatgs = this.removeFromSubctgArray(this.subCatgs, this.forDeleting.id);
        this.categories = this.removeFromArray(this.categories, this.forDeleting.id);
      } else
        this.error = "Greška!";
    });
  }

  removeSubctg(){
    this.dashService.removeSubctg(this.forDeleting.id).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.subCatgs = this.removeFromArray(this.subCatgs, this.forDeleting.id);
        this.products = this.removeFromProductArray(this.products, this.forDeleting.id);
      } else
        this.error = "Greška!";
    });
  }

  removeProd(){
    this.dashService.removeProd(this.forDeleting.id).subscribe((res:any) =>{
      if(res.resp == 'OK')
        this.products = this.removeFromArray(this.products, this.forDeleting.id);
      else
        this.error = "Greška!";
    });
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

  removeFromArray(arr, id){
    return arr.filter(function(ele){
         return ele.id != id;
     });
  }

  removeFromSubctgArray(arr, id){
    return arr.filter(function(ele){
         return ele.categoryid != id;
     });
  }

  removeFromProductArray(arr, id){
    return arr.filter(function(ele){
         return ele.subcategoryid != id;
     });
  }
  
  removeFromSubctgProd(arr, arrP){
    for(var i in arr)
      return this.removeFromProductArray(arrP, arr[i].id);
  }

}
