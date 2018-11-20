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
  private route: ActivatedRoute) { 
    this.slimLoadingBarService.start();
    this.route.parent.data.subscribe((auth) => {
      auth.base.auth.subscribe(res =>{
        if(res != null)
          this.userUid = res.uid;
        else
          this.userUid = undefined;

        this.prepareCartItems(this.userUid);
        this.prepareLikedItems(this.userUid);
      });
    })
  }

  userUid:any;
  error:any;
  itemsInCart:any = [];
  likedItemsCart:any = [];
  showItems:boolean = true;
  showLikes:boolean = false;
  quantityProblem:boolean = true;

  ngOnInit() {
    
  }

  removeLike(likeKey){
  	this.cartService.removeLike(likeKey).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.likedItemsCart = this.removeFromLikeArray(this.likedItemsCart, likeKey);
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  removeItem(itemKey){
    this.cartService.removeItem(itemKey).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.itemsInCart = this.removeFromCartArray(this.itemsInCart, itemKey);
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  onQChange(value, maxQuantity){
    if(value < 1 || value > maxQuantity)
      this.quantityProblem = true;
    else
      this.quantityProblem = false;
  }

  prepareCartItems(uid){
    this.cartService.getCartItems(uid).subscribe(
      (res) => {
        this.itemsInCart = res;
        this.itemsInCart.forEach(item =>{
          if(item.activeProd == 'Y')
            item.inStock = 'DOSTUPNO';
          else
            item.inStock = 'NEDOSTUPNO';
        })
        this.slimLoadingBarService.complete();
      }, 
      (error) => {
        this.error = error;
        setTimeout(()=>{
          this.error = null;
        }, 3000);
      })
  }

  prepareLikedItems(uid){
    this.cartService.getLikedItems(uid).subscribe(
      (res) => {
        this.likedItemsCart = res;
        this.likedItemsCart.forEach(item =>{
          if(item.activeProd == 'Y')
            item.inStock = 'DOSTUPNO';
          else
            item.inStock = 'NEDOSTUPNO';
        })
        this.slimLoadingBarService.complete();
      }, 
      (error) => {
            this.error = error;
            setTimeout(()=>{
            this.error = null;
        }, 3000);
      })
  }

  toCart(item){
     this.cartService.toCart(item.productid, item.quantity).subscribe((res:any) =>{
      if(res.resp == 'OK'){
        this.itemsInCart.push(item);
      } else
        this.error = "Greška!";

        this.slimLoadingBarService.complete();
    });
  }

  removeFromCartArray(arr, id){
    return arr.filter(function(ele){
         return ele.cartid != id;
     });
  }

  removeFromLikeArray(arr, id){
    return arr.filter(function(ele){
         return ele.likeid != id;
     });
  }
}
