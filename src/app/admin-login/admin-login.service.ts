import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private _firebaseAuth: AngularFireAuth) { }

  signInRegular(email, password) {
	  const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    
	  return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
