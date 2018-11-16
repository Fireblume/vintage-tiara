import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Globals} from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
  public firebaseApp: FirebaseApp, private http: HttpClient, private globals: Globals) {   
      this._firebaseAuth.authState.subscribe((res) => {
        if(res != null)
            this.adminUid = res.uid;
          else
            this.adminUid = undefined;
      })
  }

  adminUid:any;

  getCategories(){
      return this.http.get(this.globals.baseUrl+'/api/categories');
  }

  getSubCategories(categoryID){
  	return this.http.get(this.globals.baseUrl+'/api/subcategories?id='+categoryID);
  }

  getProducts(subCtgID){
   return this.http.get(this.globals.baseUrl+'/api/loadProducts?id='+subCtgID);
  }

  saveCategory(category){
    if(category.id == undefined ){
      return this.http.post(this.globals.baseUrl+'/api/savecategories',{
                      title: category.title,
                      active: category.active
                    });
    }
    else
      return this.http.post(this.globals.baseUrl+'/api/updatecategories',{
                      id: category.id,
                      title: category.title,
                      active: category.active
                    });
  }

  saveSubCateg(subCateg){
    if(subCateg.id == undefined ){
      return this.http.post(this.globals.baseUrl+'/api/savesubcategories',{
                      title: subCateg.title,
                      active: subCateg.active,
                      categoryid: subCateg.categoryid
                    });
    }
    else
      return this.http.post(this.globals.baseUrl+'/api/updatesubctg',{
                      id: subCateg.id,
                      title: subCateg.title,
                      active: subCateg.active,
                      categoryid: subCateg.categoryid
                    });
  }

  saveProduct(product){
    if(product.id == undefined ){
     return this.http.post(this.globals.baseUrl+'/api/saveproduct',{
                      subcategoryid: product.subcategoryid,
                      title: product.title,
                      description: product.description,
                      quantity: product.quantity,
                      //color: product.color,
                      price: product.price,
                      active: product.active,
                      photo: product.photo
                    });
    }
    else
       return this.http.post(this.globals.baseUrl+'/api/updateproduct',{
                      id: product.id,
                      subcategoryid: product.subcategoryid,
                      title: product.title,
                      description: product.description,
                      quantity: product.quantity,
                      //color: product.color,
                      price: product.price,
                      active: product.active,
                      photo: product.photo
                    });
  }

  removeSubctg(subCategId){
    return this.http.get(this.globals.baseUrl+'/api/deleteSubctg?id='+subCategId);     
  }

  removeCateg(ctgId){
    return this.http.get(this.globals.baseUrl+'/api/deleteCtg?id='+ctgId);
  }

  removeProd(prodId){
    return this.http.get(this.globals.baseUrl+'/api/deleteProduct?id='+prodId);
  }
}
