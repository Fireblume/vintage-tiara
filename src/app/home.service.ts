import { Injectable } from '@angular/core';
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
export class HomeService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
              public firebaseApp: FirebaseApp) {
               this._firebaseAuth.authState.subscribe((auth) => {
               try{
                  this.userUid = auth.uid;
                }catch(Exception){}
            });
    }

  userUid:any;

  getCategories(){
  	return this.db.list('/categories/').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ value: c.payload.val() }));
      }));
  }

  getSubCategories(){
    return this.db.list('/subcategories/').snapshotChanges().pipe(map(changes => {
          return changes.map(c => ({ value: c.payload.val() }));
        }));
  }

  getProducts(){
   return this.db.list('/products/').snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({value: c.payload.val()}));
          }));
  }

  likeProduct(productKey){
    return this.db.list('/productLikes/'+ this.userUid)
                  .set(productKey,{'productKey': productKey});
  }

  toCart(productKey, quantity){
    return this.db.list('/cart/'+ this.userUid)
                  .push({
                        productKey: productKey,
                        quantity: quantity
                      });
  }

}
