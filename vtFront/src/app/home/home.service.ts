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

  toCart(productId, quantity){
      var date = new Date();
      return this.http.post(this.globals.baseUrl+'/api/saveincart',
                {
                  productid: productId,
                  uid: this.userUid,
                  quantity: quantity,
                  date: date,
                  active: 'Y'
                });
  }

}
