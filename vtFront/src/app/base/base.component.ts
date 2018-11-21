import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { LoginService } from '../login/login.service';
import { HomeService } from '../home/home.service';
import { CartService } from '../cart/cart.service';
import { BaseService } from './base.service';
import { Globals } from '../Globals'

import { Location } from "@angular/common";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, OnDestroy{

	 logedIn:boolean;
	 userUid:any;
   cartCount:number = 0;
   prodList:any = [];
   logo:any='../../../src/image/logoB.png';
   fbicon:any='../../../src/image/ficon.png';
   instaicon:any='../../../src/image/instaicon.png';
 	 @ViewChild('viewSection') viewSection: ElementRef
 	 @ViewChild('upButton') upButton: ElementRef
 	 @ViewChild('section') section: ElementRef


	constructor(private route: Router, private _firebaseAuth: AngularFireAuth, private actRoute: ActivatedRoute, private loginService: LoginService, private homeService: HomeService,
	private cartService: CartService, private baseService: BaseService, private global: Globals,
  private location: Location, private slimLoadingBarService: SlimLoadingBarService) { 
    this.actRoute.snapshot.data.base.auth.subscribe(
      (res:any) => {
        let uid:any;
        if(res == null)
          uid = '';
        else
          uid = res.uid;

        this.baseService.cartCount(uid)
            .subscribe((cnt:number) => {this.global.countCart = cnt})
      }
    );

	}

	ngOnInit() {
	  this.checkLink();
		this.checkSession();
		this.loginService.currentLoginStatus.subscribe(message => 
			this.logedIn = message
		);

		window.addEventListener("scroll", (e: Event) => {this.scrollFunction()});
	  
    this.location.subscribe(x => {
      if(x.url == '/home')
        this.clickEvent('one');
      else if(x.url == '/info')
        this.clickEvent('two');
      else
        this.clickEvent('');
    });
	}

  clickEvent(number){
    this.global.urlPath = number;
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

    this.baseService.logOut().subscribe();
  }

  checkSession(){
  	 this.actRoute.snapshot.data.base.auth.subscribe((auth) => {    
        if(auth != null)
          this.logedIn = true;
        else
          this.logedIn = false;
    });
  }

  ngOnDestroy(){
    this.actRoute.snapshot.data.base.auth.unsubscribe();
    this.actRoute.snapshot.data.base.menuItems.unsubscribe();
    this.actRoute.snapshot.data.base.products.unsubscribe();
  }

  doSearch(input){
    if(input != "" || input != undefined){
      this.slimLoadingBarService.start();
      this.baseService.search(input);
    }
  }
}
