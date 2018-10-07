import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) {
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

  removeSubCateg(subCateg, catID){
    console.log("za brisanje " +catID)
    return this.db.object('/subcategories/'+ this.adminUid +'/'+ catID +'/'+subCateg.uidS)
                  .remove();
  }

}
