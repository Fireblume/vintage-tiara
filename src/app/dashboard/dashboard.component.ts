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

	categories:any;
	subCat:any;
  products:any;

  product:any = {};
  category: any = {};
  subCatg:any = {};
  error:any;

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
  	let suc = this.dashService.getSubCategories();
  	suc.forEach(cat => { 
  		if(cat.catId == catId)
  			this.subCat = cat;
  		});
  }

  getProducts(){
    this.products = this.dashService.getProducts();
  }

  submitCatg(category){
    this.dashService.saveCategory(category);
  }

  fillFormC(category){
    this.category.uid = category.key;
    this.category.title = category.value.title;
    this.category.isActive = category.value.active;
  }

}
