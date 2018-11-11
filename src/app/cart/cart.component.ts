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
  likedItemsCart:any = [];
  showItems:boolean = true;
  showLikes:boolean = false;
  quantityProblem:boolean = true;

  ngOnInit() {
    
  }

  removeLike(likeKey){
  	this.cartService.removeLike(likeKey).then(a =>
      this.cartService.getLikedItems(this.userUid).subscribe(res => {
      if(res.length == 0)
        this.likedItemsCart = [];
      })
    );
  }

  removeItem(itemKey){
    this.cartService.removeItem(itemKey).then(a =>
      this.cartService.getCartItems(this.userUid).subscribe(res => {
      if(res.length == 0)
        this.itemsInCart = [];
      })
    );
  }

  onQChange(value, maxQuantity){
    if(value < 1 || value > maxQuantity)
      this.quantityProblem = true;
    else
      this.quantityProblem = false;
  }

  prepareCartItems(uid, adminId){
    this.cartService.getCartItems(uid).subscribe(res => {
      if(res.length == 0)
        this.slimLoadingBarService.complete();

      let container: any = [];
      res.forEach(item =>{
        let itemCopy:any = item;
        this.cartService.getProducts(adminId, itemCopy.value.subctgKey, itemCopy.value.productKey)
        .subscribe(prod => {
          let prodCopy:any = prod;
          let itemToShow:any = {
                  'itemCartKey': itemCopy.key,
                  'key': itemCopy.value.productKey,
                  'title': prodCopy.title,
                  'description': prodCopy.description,
                  'quantity': itemCopy.value.quantity,
                  'price' : prodCopy.price,
                  'photo': prodCopy.photo
                  }
                container.push(itemToShow);
        })
        this.itemsInCart = container;
        this.slimLoadingBarService.complete();
      })
    })
  }

  prepareLikedItems(uid, adminId){
    this.cartService.getLikedItems(uid).subscribe(res => {
      if(res.length == 0)
          this.slimLoadingBarService.complete();

      let container: any = [];
      res.forEach(item =>{
        let itemCopy:any = item;
        this.cartService.getProducts(adminId, itemCopy.value.subctgKey, itemCopy.value.productKey)
        .subscribe(prod => {
          let prodCopy:any = prod;
          let itemToShow:any = {
                  'itemLikedKey': itemCopy.key,
                  'key': itemCopy.value.productKey,
                  'title': prodCopy.title,
                  'description': prodCopy.description,
                  'quantity': prodCopy.quantity,
                  'price' : prodCopy.price,
                  'photo': prodCopy.photo
                  }
                container.push(itemToShow);
        })
        this.likedItemsCart = container;
        this.slimLoadingBarService.complete();
      })
    })
  }

  object_to_ctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        map[k].key = k;
        categories.push(map[k]);
    }

    return categories;
  }

  convert_object(map) {
    let obj: any = []
    for (let k of Object.keys(map.value)) {
        map.value[k].key = k;
        map.value[k].parentId = map.key;
        obj.push(map.value[k]);
    }

    return obj;
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
