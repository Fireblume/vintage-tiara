import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
	
	constructor(private _firebaseAuth: AngularFireAuth, private route: Router){
	}

	canActivate() {
	    return this._firebaseAuth.authState.pipe(map(
	    (res) => {
	    	if(res != null)
	    		return true;
	    	else{
	    		this.route.navigate(['/home']);
	    		return false;
	    	}
	    }))	
    }
}