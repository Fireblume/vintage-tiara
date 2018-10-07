import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService: DashboardService, private _firebaseAuth: AngularFireAuth) {
      
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
  console.log(this.category)
  	this.getCategory();
    this.getProducts();
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

  getProducts(){
    this.products = this.dashService.getProducts();
  }

  submitCatg(category){
    this.dashService.saveCategory(category);
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
}
