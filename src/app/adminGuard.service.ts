import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild{
	
	constructor(private _firebaseAuth: AngularFireAuth, private route: Router){
	}

	canActivateChild() {
	    return this._firebaseAuth.authState.pipe(map(
	    (res) => {
	    	if(res != null)
	    		return true;
	    	else{
	    		this.route.navigate(['/admin']);
	    		return false;
	    	}
	    }))	
    }
}