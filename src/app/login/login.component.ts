import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private logInService: LoginService,
  private zone: NgZone) { }

  login: any = {};
  error: any;
  currentUser: any = {'uid':'', 'name':'', 'email':''}

  ngOnInit() {
  }

	doGoogleLogin(){
	  /*return new Promise<any>((resolve, reject) => {
	    let provider = new firebase.auth.GoogleAuthProvider();
	    provider.addScope('profile');
	    provider.addScope('email');
	    this.afAuth.auth
	    .signInWithPopup(provider)
	    .then(res => {
	      resolve(res);
	      this.setUser(res);
		    sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
		    this.router.navigate(['/home']);
		    this.logInService.changeLoginStatus(true);
	    })
	  })*/

	  this.logInService.signInGoogle()
		.then((res) => {    
		    this.setUser(res);
		    sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
		    this.zone.run(() => this.router.navigate(['/home']));
		    this.logInService.changeLoginStatus(true);
			
		})
	    .catch((err) => { 
	      	  this.error = err;
		      setTimeout(()=>{
			      this.error = null;
			  }, 3000);
		});
	}

	logInWithEmail() {		
	    this.logInService.signInRegular(this.login.email, this.login.password)
	      .then((res) => {
	      	this.setUser(res);
	      	sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
	      	this.router.navigate(['/home']);    
	      	this.logInService.changeLoginStatus(true);
	      })
	      .catch((err) => { 
	      	  this.error = err;
		      setTimeout(()=>{
			      this.error = null;
			  }, 3000);

		});
	}

	setUser(res){
		this.currentUser.uid = res.user.uid;
		this.currentUser.name = res.user.displayName;
		this.currentUser.email = res.user.email;
	}
}
