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
    this._firebaseAuth.authState.subscribe((res:any) => {
      let user:any;
      try{
        user = res.uid;
      }catch(Exception){
        user = null;
      }
      this.logInService.checkRole(user).subscribe((role:any) =>{
          if(role != null && user != null){
              this.adminId = user;
              this.isLoginPage = false;
              this.router.navigate(['/admin/dashboard']);
          } else{
              this.adminId = undefined;
              this.isLoginPage = true;
            }
      }) 
    })
  }

  adminId:any;
  isLoginPage:boolean;
  login:any = {};
  error:any;
  status:any = { 
    'one':true, 
    'two':false
  };

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
          else if(role.role == 'admin'){
            this.router.navigate(['/admin/dashboard']);
            this.isLoginPage = false;
          }
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

  logOut(){
    this.login = {};
    this.router.navigate(['/admin']);
    this._firebaseAuth.auth.signOut();
  }

  selectTab(item){
    this.status = {};
    this.status[item] = true;
  }
}
