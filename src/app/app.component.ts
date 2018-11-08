import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { LoginService } from './login/login.service';
import { HomeService } from './home.service';

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

	constructor(private route: Router, private _firebaseAuth: AngularFireAuth, private actRoute:ActivatedRoute, 
    private loginService: LoginService, private homeService: HomeService) { 
	}

	ngOnInit() {
    this.checkLink();
    
    if(window.location.pathname === '/admin' || window.location.pathname === '/admin/dashboard')
      this.notAdmin = false;
    else
      this.notAdmin = true;

		this.checkSession().subscribe(res => {this.logedIn = res;});
		this.loginService.currentLoginStatus.subscribe(message => this.logedIn = message)

		window.addEventListener("scroll", (e: Event) => {this.scrollFunction()});
    window.addEventListener ("popstate", (e:Event) => {this.checkLink()});
  
    this.prepareProducts();
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
    sessionStorage.removeItem("cartItems");
    sessionStorage.removeItem("likedItems");
  	this._firebaseAuth.auth.signOut();
  	this.logedIn = false;

    this.route.navigate(['/home']);
    this.clickEvent('one');
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

  prepareProducts(){
    this.homeService.getProducts().subscribe(
      (res) => {
          let prod = this.object_to_subctg_prod(res[0].value);
          sessionStorage.setItem("products", JSON.stringify(prod));
      });
  }

  object_to_ctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        map[k].key = k;
        categories.push(map[k]);
    }

    return categories;
  }

  object_to_subctg_prod(map) {
    let result: any = []
    for (let k of Object.keys(map)) {
        for (let j of Object.keys(map[k])) {
            map[k][j].key = j;
            map[k][j].parentId = k;
            result.push(map[k][j]);
        }
    }

    return result;
  }
}
