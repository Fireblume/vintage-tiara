import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Globals} from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient, private globals: Globals){}

  sendEmail(mail){
  	return this.http.post(this.globals.baseUrl+'/api/sendEmail', mail);
  }
}