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

  likeProduct(productId){
    var date = new Date();
    return this.http.post(this.globals.baseUrl+'/api/savelike',
              {
                productid: productId,
                uid: this.userUid,
                date: date,
                active: 'Y'
              });  
  }

  removeLike(productid){
    return this.http.get(this.globals.baseUrl+'/api/deletelike?id='+productid);
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

  cartCount(uid){
    return this.http.get(this.globals.baseUrl+'/api/countcartitems?uid='+uid);
  }
  
}
