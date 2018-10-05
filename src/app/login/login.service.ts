import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _firebaseAuth: AngularFireAuth) { }

  private source = new BehaviorSubject(undefined);
  currentLoginStatus = this.source.asObservable();

  signInRegular(email, password) {
	  const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    
	  return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInGoogle(){
 	let provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');

  	return this._firebaseAuth.auth.signInWithPopup(provider)
  }

  changeLoginStatus(status: boolean) {
    this.source.next(status)
  }
}
