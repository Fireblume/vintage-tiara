import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Globals} from './Globals';

@Injectable()
export class SingletonService {
	
	constructor(private http: HttpClient, private globals: Globals){}

	countCart:number = 0;

}