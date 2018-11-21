import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Globals {
  baseUrl: string = 'http://localhost:8080'; 
  countCart:number = 0;
  urlPath: string = '';
  
}