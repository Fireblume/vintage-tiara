import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vintage-tiara';

 	 notAdmin:boolean;
	 logedIn:boolean;
 	 @ViewChild('viewSection') viewSection: ElementRef
 	 @ViewChild('upButton') upButton: ElementRef
 	 @ViewChild('section') section: ElementRef

	constructor(private route: Router, private _firebaseAuth: AngularFireAuth, private actRoute: ActivatedRoute, private loginService: LoginService) { 
	}

	ngOnInit() {
    if(window.location.pathname === '/home' || window.location.pathname === '/')
      this.status['one'] = true;
    else if(window.location.pathname === '/info')
      this.status['two'] = true;


		this.checkSession().subscribe(res => {this.logedIn = res;});
		this.loginService.currentLoginStatus.subscribe(message => this.logedIn = message)

		if(window.location.pathname === '/admin' || window.location.pathname === '/admin/dashboard'){
			this.notAdmin = false;
		}
		else{
			this.notAdmin = true;
		}

		window.addEventListener("scroll", (e: Event) => {this.scrollFunction()});
	}

	status:any = { 'one':false, 
					'two':false};

  clickEvent(number){
		this.status = {};
		this.status[number] = true
	}

	gotoSection() {
        //this will provide smooth animation for the scroll
        this.viewSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

  scrollFunction(){
  	let y = window.scrollY;
  	if(y >= 200)
  		this.upButton.nativeElement.style.display = 'block';
  	else
  		this.upButton.nativeElement.style.display = 'none';
  }

  logOut(){
  	sessionStorage.removeItem("currentUser");
  	this._firebaseAuth.auth.signOut();
  	this.logedIn = false;
  }

  checkSession(){
  return Observable.create(observer => {
     this._firebaseAuth.authState.subscribe((auth) => {
        let user = auth;
        let logedIn:any = {};
        let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));

        try{
          if(user.email == sessionUser.email)
            logedIn = true;
          else{
            logedIn = false;
            this.logOut();
          }
          }catch(Exception ){
          	logedIn = false;
            this.logOut();
          }

          observer.next(logedIn);
          observer.complete();
           })
      });
  }
}
