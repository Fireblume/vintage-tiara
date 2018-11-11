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
    /*this.route.parent.data.subscribe((auth) => {
      auth.base.auth.subscribe(res =>{
        if(res != null)
          this.userUid = res.uid;
        else
          this.userUid = undefined;

        this.prepareCartItems(this.userUid, this.adminId);
        this.prepareLikedItems(this.userUid, this.adminId);
      });
    })*/

    this.route.parent.data.subscribe((auth) => {
      auth.base.adminId.subscribe(res =>{
        if(res != null)
          this.adminId = res[0].key;
        else
          this.adminId = undefined;

            this.route.parent.data.subscribe((auth) => {
            auth.base.auth.subscribe(res =>{
              if(res != null)
                this.userUid = res.uid;
              else
                this.userUid = undefined;

              this.prepareCartItems(this.userUid, this.adminId);
              this.prepareLikedItems(this.userUid, this.adminId);
            });
          })
      });
    });
  }

  userUid:any;
  adminId:any;
  itemsInCart:any = [];
  likedItems:any = [];
  showItems:boolean = true;
  showLikes:boolean = false;
  quantityProblem:boolean = true;

  ngOnInit() {
    
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

  prepareCartItems(uid, adminId){
    this.cartService.getCartItems(uid).subscribe(res => {
      this.cartService.getProducts(adminId).subscribe(res2 => {
        let container: any = [];
        let products = this.object_to_subctg_prod(res2[0].value);

        res.forEach(itemT => {
          let item:any = itemT;
            products.forEach(prod => {
              if(item.value.productKey == prod.key){
                let itemToShow:any = {
                  'key': prod.key,
                  'title': prod.title,
                  'description': prod.description,
                  'quantity': item.value.quantity,
                  'price' : prod.price,
                  'photo': prod.photo
                  }
                container.push(itemToShow);
              }
            });            
        })
        this.itemsInCart = container;
        this.slimLoadingBarService.complete();
      });
    });
  }

  prepareLikedItems(uid, adminId){
    this.cartService.getLikedItems(uid).subscribe(res => {
      this.cartService.getProducts(adminId).subscribe(res2 => {
        let container: any = [];
        let products = this.object_to_subctg_prod(res2[0].value);

        res.forEach(itemT => {
        let item:any = itemT;
          products.forEach(prod => {
            if(item.value.productKey == prod.key){
              let itemToShow:any = {
                'key': prod.key,
                'title': prod.title,
                'description': prod.description,
                'quantity': prod.quantity,
                'price' : prod.price,
                'photo': prod.photo
                }
              container.push(itemToShow);
            }
          });            
        })
        this.likedItems = container;
        this.slimLoadingBarService.complete();
      });
    });
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
