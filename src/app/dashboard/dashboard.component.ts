import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService: DashboardService) { }

	categories:any;
	subCat:any;
  products:any;

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

}
