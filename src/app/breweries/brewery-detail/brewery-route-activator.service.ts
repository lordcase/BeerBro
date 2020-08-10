import { ActivatedRouteSnapshot, ActivatedRoute, CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { BreweryService } from '../shared/brewery.service'
import {catchError, debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';


@Injectable()


export class BreweryRouteActivator implements CanActivate {
  constructor(private breweryService: BreweryService, private router: Router) {
  } 
  
  canActivate(route: ActivatedRouteSnapshot) {
    this.breweryService.getBrewery(+route.paramMap.get('id'))
    .subscribe((result)=>{
        if (!!result === false) {
          this.router.navigate(['/404'])
        }
      })
      return true
   }
}