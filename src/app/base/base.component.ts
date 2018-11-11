import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { LoginService } from '../login/login.service';
import { HomeService } from '../home/home.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit{

 	 notAdmin:boolean;
	 logedIn:boolean;
	 userUid:any;
 	 @ViewChild('viewSection') viewSection: ElementRef
 	 @ViewChild('upButton') upButton: ElementRef
 	 @ViewChild('section') section: ElementRef

	constructor(private route: Router, private _firebaseAuth: AngularFireAuth, 
	private actRoute: ActivatedRoute, private loginService: LoginService, private homeService: HomeService,
	private cartService: CartService) { 
    /*this.actRoute.snapshot.data.base.adminId.subscribe(
      res => console.log(res)
    );*/
	}

	ngOnInit() {
	  this.checkLink();
		this.checkSession();
		this.loginService.currentLoginStatus.subscribe(message => 
			this.logedIn = message
		);

		window.addEventListener("scroll", (e: Event) => {this.scrollFunction()});
	  window.addEventListener ("popstate", (e:Event) => {this.checkLink()});
	  
	}

	status:any = { 
    	'one':false, 
		'two':false
    };

  clickEvent(number){
		this.status = {};
		this.status[number] = true
	}

  checkLink(){
    if(window.location.pathname === '/home' || window.location.pathname === '/')
      this.clickEvent('one');
    else if(window.location.pathname === '/info')
      this.clickEvent('two');
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

    this.route.navigate(['/home']);
    this.clickEvent('one');
  }

  checkSession(){
  	 this.actRoute.snapshot.data.base.auth.subscribe((auth) => {    
        if(auth != null)
          this.logedIn = true;
        else
          this.logedIn = false;
    });
  }
}
