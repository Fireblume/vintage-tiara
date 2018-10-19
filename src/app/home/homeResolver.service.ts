import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { HomeService } from './home.service';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private homeService: HomeService) { }

  resolve(): Observable<any>{
    return of ([
          this.homeService.getCategories(),
          this.homeService.getSubCategories()
          
        ])
        .pipe(map(results => ({
            categories: results[0],
            subctg : results[1]
        })))
    }
}