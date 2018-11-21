import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }

	register:any = {};
	error:any;

  ngOnInit() {
  }
  	doRegister(){
  		this.registerService.registerUser(this.register.email, this.register.password)
  		.then((userCredential) => {
			this.registerService.udpateDisplayName(this.register.name);
        	this.router.navigate(['/login']);
    	})
    	.catch((error) => {
          this.error = error;
          setTimeout(()=>{
		      this.error = null;
		  }, 3000);
          console.log(error)
        });
  	}

}
