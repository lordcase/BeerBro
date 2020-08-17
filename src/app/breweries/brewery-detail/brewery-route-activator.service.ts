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
  switchMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getCurrentBrewery } from '../state/breweries.reducer';
import { loadBrewery } from '../state/breweries.actions';
import { of } from 'rxjs';

@Injectable()
export class BreweryRouteActivator implements CanActivate {
  constructor(
    private breweryService: BreweryService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    this.store.dispatch(loadBrewery({ id: route.paramMap.get('id') }));
    console.log('mutt');
    return this.store.select(getCurrentBrewery).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
