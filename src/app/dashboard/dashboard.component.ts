import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService: DashboardService, private _firebaseAuth: AngularFireAuth, 
  public db: AngularFireDatabase, public ng2ImgMax: Ng2ImgMaxService) {
      
  }

  @ViewChild('submitOption') public submitOption: ElementRef;

	categories:any;
	subCatgs:any;
  products:any;

  product:any = {};
  category: any = {};
  subCatg:any = {};
  error:any;
  categoryId:any;

  selectedC:any = {};
  selectedS:any = {};
  selectedP:any = {};

  ngOnInit() {
  	this.getCategory();
  }

  getCategory(){
  	this.dashService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
            console.log(error)
          });
  }

  getSubCat(catId){
  	this.dashService.getSubCategories(catId).subscribe(
      (res) => {
        this.subCatgs = res;
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
            console.log(error)
          });
    }

  getProducts(subCtgId){
    this.dashService.getProducts(subCtgId).subscribe(
      (res) => {
        let container:any[] = [];
        let result: any[] = res;

        for(let i of result){
          this.dashService.getPhoto(i.key).then(
            (res1 => {i.value.photo = res1; container.push(i)})
          )
        }
        console.log(this.products)
        this.products = container;
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
            console.log(error)
          });
  }

  submitCatg(category){
    this.dashService.saveCategory(category);
  }

  submitProduct(product){
    const pushId = this.db.createPushId();
    product.photo = this.product.photo;
    console.log(product)

    this.ng2ImgMax.resizeImage(product.photo, 800, 800).subscribe(
        result => {
          this.dashService.pushFileToStorage(result, pushId).on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              // in progress
            },
            (error) => {
              // fail
              console.log(error);
            },
            () => {
              // success
              this.dashService.saveProduct(product, pushId);
            });
          },
         error => {
           console.log('😢 Oh no!', error);
        });      
  }

  fillFormC(category){
    this.category.uidC = category.key;
    this.category.title = category.value.title;
    this.category.isActive = category.value.active;
  }

  submitSubctg(subCat){
    this.dashService.saveSubCateg(subCat);
  }

  fillFormS(subCat){
    this.subCatg.uidS = subCat.key;
    this.subCatg.subtitle = subCat.value.title;
    this.subCatg.isActiveS = subCat.value.active;
    this.subCatg.categoryId = subCat.parentId;
    this.categoryId = subCat.parentId;

    this.submitOption.nativeElement.disabled = true;
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
    this.submitOption.nativeElement.disabled = false;
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
}
