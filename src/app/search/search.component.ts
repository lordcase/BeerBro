import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { debounceTime } from 'rxjs/operators';

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
  searching: boolean;
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
  }

  ngOnInit() {
    this.typeahead$ = this.store.select(getTypeaheadResults);
    this.typeaheadCount$ = this.store.select(getTypeaheadResultsCount);
    this.store.select(getTypeaheadResults).subscribe((results) => {
      this.isOpen = true;
      this.searching = false;
    });
    this.searchField.valueChanges
      .pipe(debounceTime(400))
      .subscribe((search) => {
        if (search && search.length > 0) {
          this.searching = true;
          this.isOpen = false;
          this.store.dispatch(SearchActions.loadTypeahead({ term: search }));
        }
      });
    this.searching = false;
  }

  handleFocusIn() {
    this.isOpen = true;
  }
  handleFocusOut() {
    this.isOpen = false;
    // setTimeout(() => {
    //   () => this.store.dispatch(SearchActions.clearTypeahead());
    // }, 2000);
  }
  getBreweryDetails(id) {
    this.router.navigate([`/breweries/${id}`]);
  }
  handleSubmit(e) {
    this.isOpen = false;
    this.router.navigate([`/search/${this.searchString}`]);
  }
}
