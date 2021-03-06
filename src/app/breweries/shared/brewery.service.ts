import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Brewery } from '../state/breweries.reducer';
import { TypeaheadResult } from '../../search/state/search.reducer';

const API_URL = 'https://api.openbrewerydb.org/breweries';

@Injectable({
  providedIn: 'root',
})
export class BreweryService {
  constructor(private http: HttpClient) {}

  getBreweries(page: number = 1) {
    const PARAMS = new HttpParams();
    console.log('service - getBreweries page: ', page);
    return this.http
      .get(API_URL, {
        params: PARAMS.set('per_page', '5').set('page', '' + page),
      })
      .pipe(map((response) => response));
  }
  getBrewery(id: number): Observable<Brewery> {
    console.log('service - getBrewery id:', id);
    return this.http
      .get<Brewery>(API_URL + `/${+id}`)
      .pipe(map((response) => response));
  }

  freeSearch(query: string): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(API_URL + `/search?query=${query}`).pipe(
      tap((res) => console.log('free', res)),
      map((response) => response)
    );
  }

  search(term: string): Observable<TypeaheadResult[]> {
    const PARAMS = new HttpParams();

    if (term === '') {
      return of([]);
    }

    return this.http
      .get<TypeaheadResult[]>(API_URL + '/autocomplete', {
        params: PARAMS.set('query', term),
      })
      .pipe(map((response) => response));
  }
}
