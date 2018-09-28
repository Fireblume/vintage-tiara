import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { HomeService } from './home.service';
import { map } from 'rxjs/operators';

interface IReturn {
  categories: any[];
  images: any[];
}

@Injectable()
export class HomeResolver implements Resolve<IReturn> {

  constructor(private homeService: HomeService) { }

  /*resolve() {   
    return this.homeService.getCategories();
  }*/


  resolve(): Observable<IReturn>{
    return of ([
          this.homeService.getCategories(),
          this.homeService.getImages()
        ])
        .pipe(map(results => ({
            categories: results[0],
            images : results[1]
        })))
    }
}