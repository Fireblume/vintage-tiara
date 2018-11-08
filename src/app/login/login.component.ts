import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private logInService: LoginService,
  private zone: NgZone, public cartService: CartService) { }

  login: any = {};
  error: any;
  currentUser: any = {'uid':'', 'name':'', 'email':''}

  ngOnInit() {
  }

	doGoogleLogin(){
	  this.logInService.signInGoogle()
		.then((res) => {    
		    this.setUser(res);
		    sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
		    this.zone.run(() => {
		    	this.prepareCartItems(this.currentUser.uid);
    			this.prepareLikedItems(this.currentUser.uid);
    			history.back(); //add history entry - to trigger url path change
    			});
		    this.logInService.changeLoginStatus(true);
			
		})
	    .catch((err) => { 
	      	  this.error = err;
		      setTimeout(()=>{
			      this.error = null;
			  }, 3000);
		});
	}

	logInWithEmail() {		
	    this.logInService.signInRegular(this.login.email, this.login.password)
	      .then((res) => {
	      	this.setUser(res);
	      	sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
	      	this.router.navigate(['/home']);    
	      	this.logInService.changeLoginStatus(true);
	      })
	      .catch((err) => { 
	      	  this.error = err;
		      setTimeout(()=>{
			      this.error = null;
			  }, 3000);

		});
	}

	setUser(res){
		this.currentUser.uid = res.user.uid;
		this.currentUser.name = res.user.displayName;
		this.currentUser.email = res.user.email;
	}

	prepareCartItems(uid){
	    this.cartService.getCartItems(uid).subscribe(res => {
	      this.cartService.getProducts().subscribe(res2 => {
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

	        sessionStorage.setItem("cartItems", JSON.stringify(container));
	      });
	    });
  	}

  prepareLikedItems(uid){
    this.cartService.getLikedItems(uid).subscribe(res => {
      this.cartService.getProducts().subscribe(res2 => {
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

        sessionStorage.setItem("likedItems", JSON.stringify(container));
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
