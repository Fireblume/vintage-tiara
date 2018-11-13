import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) { }

  signInRegular(email, password) {
	  const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    
	  return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  checkRole(id){
  	return this.db.object('/roles/'+id).valueChanges();
  }
}
