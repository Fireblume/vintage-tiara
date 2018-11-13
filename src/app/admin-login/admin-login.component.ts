import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from './admin-login.service'
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private logInService: AdminLoginService, private router: Router, private slimLoadingBarService: SlimLoadingBarService, private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe((res) => {
      if(res != null){
          this.adminId = res.uid;
          this.router.navigate(['/admin/dashboard']);
      } else
          this.adminId = undefined;
    })
  }

  adminId:any;
  login:any = {};
  error:any;
  
  ngOnInit() {
  }

  logInWithEmail() {		
  	this.slimLoadingBarService.start();
    this.logInService.signInRegular(this.login.email, this.login.password)
      .then((res) => {
        this.logInService.checkRole(res.user.uid).subscribe((role:any) =>{
          if(role == null){
            this._firebaseAuth.auth.signOut();
            this.error = "Nemate prava pristupa";
          }
          else if(role.role == 'admin')
            this.router.navigate(['/admin/dashboard']);
          else{
            this._firebaseAuth.auth.signOut();
            this.error = "Nemate prava pristupa";
          }
        });
      	
      	this.slimLoadingBarService.complete();
      })
      .catch((err) => { 
      	  this.error = err;
	      setTimeout(()=>{
		      this.error = null;
		  }, 3000);
		  this.slimLoadingBarService.complete();
	  });
	}
}
