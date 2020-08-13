import { Component } from '@angular/core';
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

@Component({
  selector: 'brew-search',
  templateUrl: './search.component.html',
  providers: [BreweryService],
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // model: any
  // form = new FormGroup({
  // search: new FormControl(),
  // });
  searchFailed = false;
  searchField: FormControl;
  searchGroup: FormGroup;
  result: Object;
  result_count: number = 0;
  searching: boolean = false;
  isOpen: boolean = false;
  searchString: string;

  constructor(
    private searchService: BreweryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchField = new FormControl();
    this.searchGroup = fb.group({ search: this.searchField });

    this.searchField.valueChanges
      .pipe(
        tap(() => {
          this.searching = true;
          this.isOpen = false;
        }),
        debounceTime(400),
        switchMap((term) => this.searchService.search(term))
      )
      .subscribe(
        (result) => {
          this.result_count = Object.values(result).length;
          this.result = Object.values(result).slice(0, 5);
          this.searching = false;
          this.isOpen = true;
        },
        () => (this.searchFailed = true),
        () => (this.searchFailed = false)
      );
  }

  handleFocusOut() {
    this.isOpen = false;
    setTimeout(() => {
      () => (this.result = []);
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
