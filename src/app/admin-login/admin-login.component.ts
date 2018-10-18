import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from './admin-login.service'
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private logInService: AdminLoginService, private router: Router, private slimLoadingBarService: SlimLoadingBarService) { }

  currentAdmin:any = {'uid':'', 'name':'', 'email':''}
  login:any = {};
  error:any;
  
  ngOnInit() {
  }

  logInWithEmail() {		
  	this.slimLoadingBarService.start();
    this.logInService.signInRegular(this.login.email, this.login.password)
      .then((res) => {
      	this.setAdmin(res);
      	sessionStorage.setItem("currentAdmin", JSON.stringify(this.currentAdmin));
      	this.router.navigate(['/admin/dashboard']);
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

	setAdmin(res){
		this.currentAdmin.uid = res.user.uid;
		this.currentAdmin.name = res.user.displayName;
		this.currentAdmin.email = res.user.email;
	}

}
