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
       	this._firebaseAuth.authState.subscribe((auth) => {
               try{
                  this.userUid = auth.uid;
                }catch(Exception){}
            });
   	}

   userUid:any;

   	getCartItems(uid){
     	return this.db.list('/cart/'+ uid).snapshotChanges().pipe(map(changes => {
    	    return changes.map(c => ({ key: c.payload.key, value: c.payload.val() } ));
      	}));
  	}

  	getLikedItems(uid){
     	return this.db.list('/productLikes/'+ uid).snapshotChanges().pipe(map(changes => {
    	    return changes.map(c => ({ key: c.payload.key, value: c.payload.val() } ));
      	}));
  	}

  	getProducts(adminId){
   		return this.db.list('/products/'+adminId).snapshotChanges().pipe(map(changes => {
    		return changes.map(c => ({value: c.payload.val()}));
        }));
   	}

   	removeLike(productKey){
    	return this.db.list('/productLikes/'+ this.userUid + '/'+ productKey).remove();
  	}
}
