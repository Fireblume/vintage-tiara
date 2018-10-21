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
              public firebaseApp: FirebaseApp) { }

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
}
