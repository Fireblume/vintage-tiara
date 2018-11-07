import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   	constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
              public firebaseApp: FirebaseApp) {
       	let user = JSON.parse(sessionStorage.getItem("currentUser"));
    	this.userUid = user.uid;
   	}

   userUid:any;

   	getCartItems(){
     	return this.db.list('/cart/'+ this.userUid).snapshotChanges().pipe(map(changes => {
    	    return changes.map(c => ({ key: c.payload.key, value: c.payload.val() } ));
      	}));
  	}

  	getProducts(){
   		return this.db.list('/products/').snapshotChanges().pipe(map(changes => {
    		return changes.map(c => ({value: c.payload.val()}));
        }));
   	}
}
