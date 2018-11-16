import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Globals} from '../Globals'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
  public firebaseApp: FirebaseApp, private http: HttpClient, private globals: Globals) {
     this._firebaseAuth.authState.subscribe((auth) => {
       try{
          this.userUid = auth.uid;
        }catch(Exception){}
    });
  }

  userUid:any;

  getCategories(adminId){
  	return this.db.list('/categories/'+adminId).snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({key:c.payload.key, value: c.payload.val() }));
      }));
  }

  getSubCategories(adminId){
    return this.db.list('/subcategories/'+adminId).snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({key:c.payload.key, value: c.payload.val() }));
      }));
  }

  getProducts(subctgId){
    return this.http.get(this.globals.baseUrl+'/api/loadProducts?id='+subctgId);
  }

  likeProduct(subctgId, productId){
    return this.db.list('/productLikes/'+ this.userUid)
                  .push({
                      'subctgKey': subctgId,
                      'productKey': productId
                      });
  }

  removeLike(productKey){
      return this.db.list('/productLikes/'+ this.userUid + '/'+ productKey).remove();
    }

  toCart(subctgId, productId, quantity){
    return this.db.list('/cart/'+ this.userUid)
                  .push({
                        'subctgKey': subctgId,
                        'productKey': productId,
                        'quantity': quantity
                      });
  }

}
