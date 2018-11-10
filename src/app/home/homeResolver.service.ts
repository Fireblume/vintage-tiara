import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute } from '@angular/router';
import { Observable, pipe, forkJoin, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeService } from './home.service';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private route: ActivatedRoute,private homeService: HomeService) { }

  /*resolve(): Observable<any>{
    return of ([
          this.homeService.getCategories(),
          this.homeService.getSubCategories()
        ])
        .pipe(map(results => ({
            categories: results[0],
            subctg: results[1]
        })))
    }*/

  resolve(): Observable<any>{
    return of ([
          this.homeService.getCategories(),
          this.homeService.getSubCategories()
        ])
        .pipe(map(results => {
          let subject = new Subject<any>();

          results[0].subscribe(prodRes =>{
            let categories = this.object_to_ctg(prodRes[0].value);

            results[1].subscribe(
              (res2) => {
                 let subctgs = this.object_to_subctg_prod(res2[0].value);
                 
                  categories.forEach(val => { 
                    let subcSet:any = [];

                    subctgs.forEach(val2 => { 
                      if(val.key == val2.parentId)
                        subcSet.push(val2);
                    })

                    val.subctgs = subcSet;
                 })

              subject.next(categories);
          });
        });
        return subject.asObservable();
        }
      ))
  }

  /*resolve(route: ActivatedRouteSnapshot):any{   
    route.parent.data.base.categories.subscribe(prodRes =>{
      let categories = this.object_to_ctg(prodRes[0].value);

      route.parent.data.base.subctg.subscribe(
        (res2) => {
           let subctgs = this.object_to_subctg_prod(res2[0].value);
           
            categories.forEach(val => { 
              let subcSet:any = [];

              subctgs.forEach(val2 => { 
                if(val.key == val2.parentId)
                  subcSet.push(val2);
              })

              val.subctgs = subcSet;
           })

        sessionStorage.setItem("categories", JSON.stringify(categories));
        return categories;
      })

    })      
  }*/

  object_to_ctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        map[k].key = k;
        categories.push(map[k]);
    }

    return categories;
  }

  object_to_subctg_prod(map) {
    let result: any = []
    for (let k of Object.keys(map)) {
        for (let j of Object.keys(map[k])) {
            map[k][j].key = j;
            map[k][j].parentId = k;
            result.push(map[k][j]);
        }
    }

    return result;
  }
}