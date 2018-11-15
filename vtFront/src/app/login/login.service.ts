import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _firebaseAuth: AngularFireAuth, private http: HttpClient) { }

  private source = new BehaviorSubject(undefined);
  currentLoginStatus = this.source.asObservable();
  baseUrl = 'http://localhost:8080'; 

  signInRegular(email, password) {
	  const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    
	  return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInGoogle(){
   	let provider = new firebase.auth.GoogleAuthProvider();
  	provider.addScope('profile');
  	provider.addScope('email');

  	return this._firebaseAuth.auth.signInWithPopup(provider)
  }

  changeLoginStatus(status: boolean) {
    this.source.next(status)
  }

  sendUser(user:User): Observable<any>{
      return this.http.post(this.baseUrl+'/api/addUser',user);
  }

  sendEmail(email){
      return this.http.get(this.baseUrl+'/api/receive?email='+email);
  }
}
