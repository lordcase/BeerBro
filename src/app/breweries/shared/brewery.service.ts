import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://api.openbrewerydb.org/breweries';

@Injectable({
  providedIn: 'root',
})
export class BreweryService {
  constructor(private http: HttpClient) {}

  getBreweries(page: number = 1) {
    const PARAMS = new HttpParams();
    console.log('erg');
    return this.http
      .get(API_URL, {
        params: PARAMS.set('per_page', '5').set('page', '' + page),
      })
      .pipe(map((response) => response));
  }
  getBrewery(id: number) {
    return this.http.get(API_URL + `/${id}`).pipe(map((response) => response));
  }

  freeSearch(query: string) {
    return this.http
      .get(API_URL + `/search?query=${query}`)
      .pipe(map((response) => response));
  }

  search(term: string) {
    const PARAMS = new HttpParams();

    if (term === '') {
      return of([]);
    }

    return this.http
      .get(API_URL + '/autocomplete', { params: PARAMS.set('query', term) })
      .pipe(map((response) => response));
  }
}
