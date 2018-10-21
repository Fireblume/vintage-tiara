import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
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
              public firebaseApp: FirebaseApp) {
       this._firebaseAuth.authState.subscribe((auth) => {
              this.adminUid = auth.uid;
            });
   }

   adminUid:any;

  getCategories(){
      return this.db.list('/categories/'+ this.adminUid).snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, value: c.payload.val() }));
      }));
  }

  getSubCategories(categoryID){
  	return this.db.list('/subcategories/'+ this.adminUid + '/'+ categoryID)
                  .snapshotChanges().pipe(map(changes => {
                    return changes.map(c => ({ key: c.payload.key, value: c.payload.val(), parentId: categoryID }));
                  }));
  }

  getProducts(subCtgID){
   return this.db.list('/products/'+ this.adminUid + '/'+ subCtgID)
                  .snapshotChanges().pipe(map(changes => {
                    return changes.map(c => ({ key: c.payload.key, value: c.payload.val(), parentId: subCtgID }));
                  }));
  }

  saveCategory(category){
    if(category.uidC == undefined ){
      const pushId = this.db.createPushId();
      return this.db.list('/categories/'+ this.adminUid)
                    .set(pushId,{
                          title: category.title,
                          active: category.isActive
                        });
    }
    else
      return this.db.object('/categories/'+ this.adminUid +'/'+category.uidC)
                    .update({
                      title: category.title,
                      active: category.isActive
                    });
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

  removeSubctg(subCateg){
    return this.getProducts(subCateg.key).subscribe(
      (res) => {
        const storageRef = this.firebaseApp.storage().ref();
        let productList = res;
        for(let i of productList){
          this.removeProd(i);
        }

        this.db.object('/subcategories/'+ this.adminUid +'/'+ subCateg.parentId +'/'+subCateg.key)
                  .remove().catch((error) => console.log(error));
      });     
  }

  removeCateg(categ){
    return this.getSubCategories(categ.key).subscribe(
      (res) => {
        let subctgList = res;
        for(let i of subctgList){
          this.removeSubctg(i);
        }

        this.db.object('/categories/'+ this.adminUid +'/'+ categ.key).remove()
        .catch((error) => console.log(error));;
      });
  }

  removeProd(prod){
    return this.db.object('/products/'+ this.adminUid +'/'+ prod.parentId +'/'+ prod.key)
                  .remove().catch((error) => console.log(error));
  }
}
