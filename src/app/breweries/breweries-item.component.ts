import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  toggleFavorites,
  loadBrewery,
} from 'app/breweries/state/breweries.actions';
import {
  State,
  getFavourites,
  Brewery,
} from 'app/breweries/state/breweries.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'breweries-item',
  templateUrl: './breweries-item.component.html',
  styleUrls: ['./breweries-item.component.scss'],
})
export class BreweriesItemComponent implements OnInit, OnDestroy {
  @Input() brewery: Brewery;
  isfaved: boolean = false;
  favArray: Array<any>;
  sub: Subscription;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.sub = this.store.select(getFavourites).subscribe((favourites) => {
      this.favArray = Object.values(favourites).map((value) => value['id']);
      if (this.brewery) {
        this.isfaved = this.favArray.includes(this.brewery.id);
      }
    });
  }

  handleFavouritization(event): void {
    event.stopImmediatePropagation();
    this.store.dispatch(toggleFavorites({ brewery: this.brewery }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
