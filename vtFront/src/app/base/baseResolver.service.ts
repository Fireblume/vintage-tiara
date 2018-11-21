import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from 'firebase';

@Injectable()
export class BaseResolver implements Resolve<any> {

  constructor(private baseService: BaseService, private _firebaseAuth: AngularFireAuth) { 
     this.user = JSON.parse(sessionStorage.getItem("currentUser"));
  }

  user:any;

  resolve(): Observable<any>{
    return of(
    [this._firebaseAuth.authState, 
    this.baseService.getAdminId(),
    this.baseService.getMenuItems(),
    this.baseService.getProducts(),
    this.baseService.cartCount(this.user.uid)]
    ).pipe(map(res => ({
    	auth: res[0],
    	adminId: res[1],
      menuItems: res[2],
      products: res[3],
      cartCount: res[4]
    })));
  }

}