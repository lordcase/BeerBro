import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreweryService } from '../shared/brewery.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { toggleFavorites } from 'app/breweries/state/breweries.actions';
import { State, getFavourites } from 'app/breweries/state/breweries.reducer';

@Component({
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss'],
})
export class BreweryDetailComponent implements OnInit, OnDestroy {
  brewery: any;
  navigationSubscription;
  isfaved: boolean = false;
  favArray: Array<any>;

  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    this.store.pipe(select(getFavourites)).subscribe((favourites) => {
      this.favArray = Object.values(favourites).map((value) => value['id']);
      if (this.brewery) {
        this.isfaved = this.favArray.includes(this.brewery.id);
      }
    });
  }

  ngOnInit() {}

  initialiseInvites() {
    this.breweryService
      .getBrewery(+this.route.snapshot.paramMap.get('id'))
      .subscribe((result) => {
        this.brewery = result;
        this.isfaved = this.favArray.includes(this.brewery.id);
      });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  handleFavouritization(event): void {
    event.stopImmediatePropagation();
    this.store.dispatch(toggleFavorites({ brewery: this.brewery }));
  }
}
