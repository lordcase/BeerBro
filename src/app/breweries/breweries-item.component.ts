import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toggleFavorites } from 'app/breweries/state/breweries.actions';
import { State, getFavourites } from 'app/breweries/state/breweries.reducer';

@Component({
  selector: 'breweries-item',
  templateUrl: './breweries-item.component.html',
  styleUrls: ['./breweries-item.component.scss'],
})
export class BreweriesItemComponent implements OnInit {
  @Input() brewery: any;
  isfaved: boolean = false;
  favArray: Array<any>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(getFavourites).subscribe((favourites) => {
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
}
