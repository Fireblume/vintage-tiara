import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase,
  public firebaseApp: FirebaseApp, private http: HttpClient) {   
      this._firebaseAuth.authState.subscribe((res) => {
        if(res != null)
            this.adminUid = res.uid;
          else
            this.adminUid = undefined;
      })
  }

  adminUid:any;
  baseUrl = 'http://localhost:8080'; 

  getCategories(){
      return this.http.get(this.baseUrl+'/api/categories');
  }

  getSubCategories(categoryID){
  	return this.http.get(this.baseUrl+'/api/subcategories?id='+categoryID);
  }

  getProducts(subCtgID){
   return this.db.list('/products/'+ this.adminUid + '/'+ subCtgID)
                  .snapshotChanges().pipe(map(changes => {
                    return changes.map(c => ({ key: c.payload.key, value: c.payload.val(), parentId: subCtgID }));
                  }));
  }

  saveCategory(category){
    if(category.id == undefined ){
      return this.http.post(this.baseUrl+'/api/savecategories',{
                      title: category.title,
                      active: category.isActive
                    });
    }
    /*else
      return this.db.object('/categories/'+ this.adminUid +'/'+category.uidC)
                    .update({
                      title: category.title,
                      active: category.isActive
                    });*/
  }

  saveSubCateg(subCateg){
    if(subCateg.uidS == undefined ){
      const pushId = this.db.createPushId();
      return this.db.list('/subcategories/'+ this.adminUid + '/'+ subCateg.categoryId)
                    .set(pushId,{
                          title: subCateg.subtitle,
                          active: subCateg.isActiveS
                        });
    }
    else
      return this.db.object('/subcategories/'+ this.adminUid + '/'+ subCateg.categoryId +'/'+subCateg.uidS)
                    .update({
                      title: subCateg.subtitle,
                      active: subCateg.isActiveS
                    });
  }

  saveProduct(product, pushId){
    if(product.uidP == undefined ){
      return this.db.list('/products/'+ this.adminUid + '/'+ product.subCtgId)
                    .set(pushId,{
                          title: product.prodtitle,
                          description: product.desc,
                          quantity: product.quantity,
                          color: product.color,
                          price: product.price,
                          available: product.isAvailable,
                          photo: product.photo
                        });
    }
    else
      return this.db.object('/products/'+ this.adminUid + '/'+ product.subCtgId +'/'+product.uidP)
                    .update({
                      title: product.prodtitle,
                      description: product.desc,
                      quantity: product.quantity,
                      color: product.color,
                      price: product.price,
                      available: product.isAvailable,
                      photo: product.photo
                    });
  }

  removeSubctg(subCategId){
    return this.http.get(this.baseUrl+'/api/deleteSubctg?id='+subCategId);     
  }

  removeCateg(ctgId){
    return this.http.get(this.baseUrl+'/api/deleteCtg?id='+ctgId);
  }

  removeProd(prod){
    return this.db.object('/products/'+ this.adminUid +'/'+ prod.parentId +'/'+ prod.key)
                  .remove().catch((error) => console.log(error));
  }
}
