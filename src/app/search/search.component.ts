import {Component} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
import {BreweryService} from '../breweries/shared/brewery.service'
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'brew-search',
  templateUrl: './search.component.html',
  providers: [BreweryService],
  styles: [`.form-control { width: 300px; }`]
})
export class SearchComponent {
  // model: any
  // searching = false;
  // searchFailed = false;
  // form = new FormGroup({
  // search: new FormControl(),
  // });
  searchField: FormControl;
    searchGroup: FormGroup;
    result: Object
  
  

  constructor(private searchService:BreweryService, private fb:FormBuilder) {
    this.searchField = new FormControl();
    this.searchGroup = fb.group({search: this.searchField});

    this.searchField.valueChanges.pipe(
      debounceTime(400),
        switchMap(term => this.searchService.search(term)))
        .subscribe((result) => {
          this.result = result
          for (let a in result) {
            console.log(result[a].name)
          }
        });
}
  
  handleKeypress() {
  }
  onSubmit() {}

  // data = this._service.search(this.form.get('search').value).subscribe({
  //   next(response) { console.log('aaa',response); },
  //   error(err) { console.error('Error: ' + err); },
  //   complete() { console.log('Completed'); }
  // });
  
  // data = (text$: Observable<any>) =>
  //   text$.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap(term =>
  //       this._service.search(term).pipe(
  //         tap(() => this.searchFailed = false),
  //         catchError(() => {
  //           this.searchFailed = true;
  //           return of([]);
  //         }))
  //     ).subscribe(console.log),
  //     tap(() => this.searching = false)
  //   )

}






