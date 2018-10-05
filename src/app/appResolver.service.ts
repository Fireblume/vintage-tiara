import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

interface IReturn {
  logedIn: any;
}

@Injectable()
export class AppResolver implements Resolve<IReturn> {
  user:any;

  constructor(private _firebaseAuth: AngularFireAuth) {}

  resolve(): Observable<any>{
   return Observable.create(observer => {
       this._firebaseAuth.authState.subscribe((auth) => {
          this.user = auth;
          let logedIn:any = {};
          let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));

          if(this.user.email == sessionUser.email)
            logedIn = true;
          else
            logedIn = false;

            observer.next(logedIn);
            observer.complete();
             })
        });
    }
}