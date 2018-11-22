import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Globals} from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
              public firebaseApp: FirebaseApp, private http: HttpClient, private globals: Globals) {
               this._firebaseAuth.authState.subscribe((auth) => {
               try{
                  this.userUid = auth.uid;
                }catch(Exception){}
            });
    }

  userUid:any;
  private subject = new Subject<any>();

  getAdminId(){
    return this.db.list('/categories/').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key }));
      }));
  }

  getProducts(){
   return this.http.get(this.globals.baseUrl+'/api/loadAllProducts');
  }

  getNewAndSale(){
    return this.http.get(this.globals.baseUrl+'/api/loadNewOrSaleProducts');
  }

  logOut(){
    return this.http.get(this.globals.baseUrl+'/api/logout?invalid=true');
  }

  getMenuItems(){
    return this.http.get(this.globals.baseUrl+'/api/load');
  }

  cartCount(uid){
    return this.http.get(this.globals.baseUrl+'/api/countcartitems?uid='+uid);
  }

  search(input){
    this.http.get(this.globals.baseUrl+'/api/search?src='+input).subscribe(res =>{
      this.subject.next(res);
    });
  }

  getSearch(): Observable<any> {
    return this.subject.asObservable();
  }
}
