import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) { }

  getCategories(){
  	return [
  		{'id': 'o', 'cat':'prva'},
  		{'id': 'd', 'cat':'druga'},
  		{'id': 'f', 'cat':'treca'},
  		{'id': 't', 'cat':'cetvrta'},
  		{'id': 'e', 'cat':'prva'},
  		{'id': 'g', 'cat':'druga'},
  		{'id': 'y', 'cat':'treca'}
  	]
  }

  getSubCategories(){
  	return [
	  		{'catId':'o',
	  		'catgs': [
	  			{'subcat':'prva'},
	  			{'subcat':'druga'},
	  			{'subcat':'treca'}
	  			]},
	  		{'catId':'d',
	  		'catgs': [
	  			{'subcat':'druga gdd'},
	  			{'subcat':'dkkkkdj'},
	  			{'subcat':'kdkkkdk'}
	  			]},
	  	]
  }

  getProducts(){
    return [
          {
            'image': 'logo-try.jpg',
            'title': 'Test test testiiici',
            'desc': 'Test',
            'quantity':'2',
            'price':'200'
          },
          {
            'image': 'logo-withbackground.jpg',
            'title': 'Test tskdjklsjdlkfsjlkfjslkdj dj',
            'desc': 'Test',
            'quantity':'10',
            'price':'100'
          },
          {
            'image': 'logo.jpg',
            'title': 'Test',
            'desc': 'Test',
            'quantity':'8',
            'price':'3000'
          },
          {
            'image': 'logo-try.jpg',
            'title': 'Test',
            'desc': 'TestTest',
            'quantity':'2',
            'price':'500'
          },
          {
            'image': 'logo-withbackground.jpg',
            'title': 'Test',
            'desc': 'Test',
            'quantity':'1',
            'price':'1000'
          }
    ]
  }

  saveCategory(category, adminUid){

    if(category.uid == undefined )
      return this.db.list('/categories/'+adminUid)
                    .push({
                          title: category.title,
                          active: category.isActive
                        });
    else
      return this.db.object('/categories/'+adminUid+'/'+category.uid)
                    .update({
                      title: category.title,
                      active: category.isActive
                    });
  }

}
