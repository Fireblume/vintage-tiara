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
    if(category.uidC == undefined )
      return this.db.list('/categories/'+ this.adminUid)
                    .push({
                          title: category.title,
                          active: category.isActive
                        });
    else
      return this.db.object('/categories/'+ this.adminUid +'/'+category.uidC)
                    .update({
                      title: category.title,
                      active: category.isActive
                    });
  }

  saveSubCateg(subCateg){
    if(subCateg.uidS == undefined )
      return this.db.list('/subcategories/'+ this.adminUid + '/'+ subCateg.categoryId)
                    .push({
                          title: subCateg.subtitle,
                          active: subCateg.isActiveS
                        });
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
                          available: product.isAvailable
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
                      available: product.isAvailable
                    });
  }

  removeSubCateg(subCateg, catID){
    console.log("za brisanje " +catID)
    return this.db.object('/subcategories/'+ this.adminUid +'/'+ catID +'/'+subCateg.uidS)
                  .remove();
  }

  removeCateg(categ){
    this.getSubCategories(categ.key).subscribe(
      (res) => {
        let subctgList = res;
        console.log(subctgList)
        for(let i of subctgList)
          this.db.object('/products/'+ this.adminUid +'/'+ i.key).remove();

        this.db.object('/subcategories/'+ this.adminUid +'/'+ categ.key).remove();
        this.db.object('/categories/'+ this.adminUid +'/'+ categ.key).remove();
      });
  }

  pushFileToStorage(fileUpload: File, pushId) {
    const storageRef = this.firebaseApp.storage().ref();
    return storageRef.child('/photos/'+ pushId).put(fileUpload);
  }

  getPhoto(productId){
    const storageRef = this.firebaseApp.storage();
    return storageRef.ref('/photos/'+productId).getDownloadURL();
  }

}
