import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BreweryService } from './shared/brewery.service';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class BreweriesListResolver implements Resolve<any> {
  constructor(private breweryService: BreweryService) {}
  resolve() {
    return this.breweryService.getBreweries().pipe(
      // tap((breweries) => console.log('breweries', breweries)),
      map((breweries) => breweries)
    );
  }
}
