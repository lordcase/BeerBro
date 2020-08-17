import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreweryService } from '../shared/brewery.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { toggleFavorites } from 'app/breweries/state/breweries.actions';
import {
  State,
  getFavourites,
  Brewery,
  getCurrentBrewery,
} from 'app/breweries/state/breweries.reducer';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss'],
})
export class BreweryDetailComponent implements OnInit, OnDestroy {
  navigationSubscription;
  isfaved: boolean = false;
  favArray: Array<any>;
  brewery$: Observable<Brewery | null>;
  breweryId: number;
  sub: Subscription;
  sub2: Subscription;

  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {
    this.sub = this.store.select(getFavourites).subscribe((favourites) => {
      this.favArray = Object.values(favourites).map((value) => value['id']);
      if (this.breweryId) {
        this.isfaved = this.favArray.includes(this.breweryId);
      }
    });
  }

  ngOnInit() {
    this.brewery$ = this.store.select(getCurrentBrewery);
    // this.brewery$.subscribe((brew) => (this.breweryId = brew.id));
    this.sub2 = this.brewery$.subscribe((currentBrewery) => {
      console.log('curr', currentBrewery);
      if (currentBrewery) {
        this.breweryId = currentBrewery.id;
        console.log('curr2', currentBrewery.id);
        this.isfaved = this.favArray.includes(currentBrewery.id);
      } else {
        this.breweryId = 0;
      }
    });
  }

  handleFavouritization(event, brewery): void {
    event.stopImmediatePropagation();
    this.store.dispatch(toggleFavorites({ brewery: brewery }));
    console.log('brr', brewery);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
