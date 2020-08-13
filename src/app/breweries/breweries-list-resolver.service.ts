import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BreweryService } from './shared/brewery.service';
import { map } from 'rxjs/operators';

@Injectable()
export class BreweriesListResolver implements Resolve<any> {
  constructor(private breweryService: BreweryService) {}
  resolve() {
    return this.breweryService
      .getBreweries()
      .pipe(map((breweries) => breweries));
  }
}
