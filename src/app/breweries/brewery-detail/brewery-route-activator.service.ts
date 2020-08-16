import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  CanActivate,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { BreweryService } from '../shared/brewery.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getCurrentBrewery } from '../state/breweries.reducer';
import { loadBrewery } from '../state/breweries.actions';

@Injectable()
export class BreweryRouteActivator implements CanActivate {
  constructor(
    private breweryService: BreweryService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    this.store.dispatch(loadBrewery({ id: route.paramMap.get('id') }));
    return true;
  }
  //   this.breweryService
  //     .getBrewery(+route.paramMap.get('id'))
  //     .subscribe((result) => {
  //       if (!!result === false) {
  //         this.router.navigate(['/404']);
  //       }
  //     });
  //   return true;
  // }
}
