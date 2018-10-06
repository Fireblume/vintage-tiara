import { Component, OnInit } from '@angular/core';
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
       this._firebaseAuth.authState.subscribe((auth) => {
              this.adminUid = auth.uid;
            });
  }

  adminUid:any;
	categories:any;
	subCat:any;
  products:any;

  product:any = {};
  category:any = {};
  subCatg:any = {};

  ngOnInit() {
  	this.getCategory();
    this.getProducts();
  }

  getCategory(){
  	this.categories = this.dashService.getCategories();
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
    this.dashService.saveCategory(category, this.adminUid);
  }

}
