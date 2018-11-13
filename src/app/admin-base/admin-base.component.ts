import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.css']
})
export class AdminBaseComponent implements OnInit {

  constructor(private router: Router, private _firebaseAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this._firebaseAuth.authState.subscribe((res) => {
    	if(res != null)
          this.adminId = res.uid;
        else
          this.adminId = undefined;
    })
  }

  adminId:any;
  isLoginPage:boolean;
  status:any = { 
    'one':true, 
    'two':false
    };

  ngOnInit() {
  	this.router.navigate(['/admin/login']);
  }

  logOut(){
    this._firebaseAuth.auth.signOut();
  }

  selectTab(item){
    this.status = {};
    this.status[item] = true;
  }

}
