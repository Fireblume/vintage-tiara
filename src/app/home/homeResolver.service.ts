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

    resolve(){}
}