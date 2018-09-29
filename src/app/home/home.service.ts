import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getCategories(){
  	return [ {'kategorija': 'RAJFOVI', 'podkategorija': ['blavi', 'dkd', 'kooo', 'dkkdklallk']},
  			 {'kategorija': 'HVATACI SNOVA','podkategorija': ['blavi', 'dkd']},
  			 {'kategorija': 'MINDJUSE','podkategorija': ['blavi', 'dkd']}, 
  			 {'kategorija': 'OGRLICE','podkategorija': ['blavi', 'dkd']}, 
  			 {'kategorija': 'KOMPLETI','podkategorija': ['blavi', 'dkd']}, 
  			 {'kategorija': 'DEKUPAZ','podkategorija': ['blavi', 'dkd']}];
  }

  getImages(){
  	return ['logo-try.jpg', 'logo-withbackground.jpg', 'logo.jpg',  'logo.jpg', 'logo-try.jpg', 'logo-withbackground.jpg', 'logo.jpg', 'logo.jpg','logo-try.jpg', 'logo-withbackground.jpg', 'cover.jpg'];
  }
}
