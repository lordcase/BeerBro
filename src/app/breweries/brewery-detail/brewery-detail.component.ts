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
import { Observable } from 'rxjs';

@Component({
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss'],
})
export class BreweryDetailComponent implements OnInit {
  brewery: any;
  navigationSubscription;
  isfaved: boolean = false;
  favArray: Array<any>;
  brewery$: Observable<Brewery> = this.store.select(getCurrentBrewery);

  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {
    this.store.pipe(select(getFavourites)).subscribe((favourites) => {
      this.favArray = Object.values(favourites).map((value) => value['id']);
      if (this.brewery) {
        this.isfaved = this.favArray.includes(this.brewery.id);
      }
    });
  }

  ngOnInit() {}

  handleFavouritization(event): void {
    event.stopImmediatePropagation();
    this.store.dispatch(toggleFavorites({ brewery: this.brewery }));
  }
}
