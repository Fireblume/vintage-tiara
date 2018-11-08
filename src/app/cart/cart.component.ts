import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private slimLoadingBarService: SlimLoadingBarService, 
  private route: ActivatedRoute) { }

  itemsInCart:any = [];
  likedItems:any = [];
  showItems:boolean = true;
  showLikes:boolean = false;
  quantityProblem:boolean = true;

  ngOnInit() {
	this.slimLoadingBarService.start();
	this.itemsInCart = JSON.parse(sessionStorage.getItem("cartItems"));
	this.likedItems = JSON.parse(sessionStorage.getItem("likedItems"));
	this.slimLoadingBarService.complete();
  }

  removeLike(productKey){
  	this.cartService.removeLike(productKey);
  }

  onQChange(value, maxQuantity){
    if(value < 1 || value > maxQuantity)
      this.quantityProblem = true;
    else
      this.quantityProblem = false;
  }
}
