import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
} from 'rxjs/operators';
import { BreweryService } from '../breweries/shared/brewery.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  TypeaheadResult,
  getTypeaheadResults,
  getTypeaheadResultsCount,
} from './state/search.reducer';
import * as SearchActions from './state/search.actions';

@Component({
  selector: 'brew-search',
  templateUrl: './search.component.html',
  providers: [BreweryService],
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // model: any
  // form = new FormGroup({
  // search: new FormControl(),
  // });
  searchFailed = false;
  searchField: FormControl;
  searchGroup: FormGroup;
  typeahead$: Observable<TypeaheadResult[]>;
  typeaheadCount$: Observable<number>;
  searching: boolean = false;
  isOpen: boolean = false;
  searchString: string;

  constructor(
    private searchService: BreweryService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.searchField = new FormControl();
    this.searchGroup = fb.group({ search: this.searchField });

    this.searchField.valueChanges.pipe(
      tap(() => {
        this.searching = true;
        this.isOpen = false;
        console.log('tippiti');
      }),
      debounceTime(400),
      tap((search) => this.store.dispatch(search))
      // switchMap((term) => this.searchService.search(term))
    );
  }

  ngOnInit() {
    this.typeahead$ = this.store.select(getTypeaheadResults);
    this.typeaheadCount$ = this.store.select(getTypeaheadResultsCount);
  }

  handleFocusOut() {
    this.isOpen = false;
    setTimeout(() => {
      () => this.store.dispatch(SearchActions.clearTypeahead());
    }, 2000);
  }
  getBreweryDetails(id) {
    this.router.navigate([`/breweries/${id}`]);
  }
  handleSubmit(e) {
    this.isOpen = false;
    this.router.navigate([`/search/${this.searchString}`]);
  }
}
