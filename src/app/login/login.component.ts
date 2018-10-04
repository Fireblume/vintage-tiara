import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

	doGoogleLogin(){
	  return new Promise<any>((resolve, reject) => {
	    let provider = new firebase.auth.GoogleAuthProvider();
	    provider.addScope('profile');
	    provider.addScope('email');
	    this.afAuth.auth
	    .signInWithPopup(provider)
	    .then(res => {
	      resolve(res);
	      this.router.navigate(['/home']);
	    })
	  })
	}
}
