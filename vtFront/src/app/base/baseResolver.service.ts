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
  }

  resolve(): Observable<any>{
    return of(
    [this._firebaseAuth.authState, 
    this.baseService.getMenuItems(),
    this.baseService.getProducts(),
    this.baseService.getNewAndSale()]
    ).pipe(map(res => ({
    	auth: res[0],
      menuItems: res[1],
      products: res[2],
      newAsale: res[3]
    })));
  }

}