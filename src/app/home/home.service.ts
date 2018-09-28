import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getCategories(){
  	return [ 'RAJFOVI', 'HVATACI SNOVA', 'MINDJUSE', 'OGRLICE', 'KOMPLETI', 'DEKUPAZ'];
  }

  getImages(){
  	return ['logo-try.jpg', 'logo-withbackground.jpg', 'logo.jpg', 'logo-withbackground.png', 'logo.jpg', 'logo-withbackground.png','logo-try.jpg', 'logo-withbackground.jpg', 'logo.jpg', 'logo-withbackground.png', 'logo.jpg', 'logo-withbackground.png','logo-try.jpg', 'logo-withbackground.jpg'];
  }
}
