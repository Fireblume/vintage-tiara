import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private slimLoadingBarService: SlimLoadingBarService) { }

  itemsInCart:any = [];
  showLikes:boolean = false;

  ngOnInit() {
	this.showItems();
  }

  showItems(){
  	this.slimLoadingBarService.start();
  	this.cartService.getCartItems().subscribe(res => {console.log(res),
  		this.cartService.getProducts().subscribe(res2 => {
  			let container: any = [];
  			let products = this.object_to_subctg_prod(res2[0].value);

  			res.forEach(itemT => {
  			let item:any = itemT;
  				products.forEach(prod => {
  					if(item.value.productKey == prod.key){
  						let itemToShow:any = {
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
