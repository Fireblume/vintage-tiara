import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _firebaseAuth: AngularFireAuth) { }

  	registerUser(email, password) {
	    return this._firebaseAuth.auth.createUserWithEmailAndPassword( email, password);
    }

    udpateDisplayName(name){
    	this._firebaseAuth.authState.subscribe((auth) => {
              auth.updateProfile({
					  displayName: name,
					  photoURL: ""
					}).then(function() {
					  // this.user = auth
					  console.log(auth)
					}, function(error) {
					  // An error happened.
					});
            });
    }
}
