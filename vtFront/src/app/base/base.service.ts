import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class BaseService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
              public firebaseApp: FirebaseApp, private http: HttpClient) {
               this._firebaseAuth.authState.subscribe((auth) => {
               try{
                  this.userUid = auth.uid;
                }catch(Exception){}
            });
    }

  userUid:any;
  baseUrl = 'http://localhost:8080'; 

  getAdminId(){
    return this.db.list('/categories/').snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key }));
      }));
  }

  getProducts(){
   return this.db.list('/products/').snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({value: c.payload.val()}));
          }));
  }

  logOut(){
    return this.http.get(this.baseUrl+'/api/logout?invalid=true');
  }

  getMenuItems(){
    return this.http.get(this.baseUrl+'/api/load');
  }
}
