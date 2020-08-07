import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

const API_URL = 'https://api.openbrewerydb.org/breweries/autocomplete';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable({
  providedIn: 'root'
})


export class BreweryService {
  constructor(private http: HttpClient) {
  }

    getBreweries() {
      return BREWERIES
    }
    getBrewery(id:number) {
      return BREWERIES.find(brewery=>brewery.id===id)
    }
    search(term: string) {
      if (term === '') {
        return of([]);
      }
  
      return this.http
        .get(API_URL, {params: PARAMS.set('query', term),responseType:'json'}).pipe(
          map(response => response)
        );
    }
  }

const BREWERIES = [
  {
    id: 299,
    name: "Almanac Beer Company",
    brewery_type: "micro",
    street: "651B W Tower Ave",
    city: "Alameda",
    state: "California",
    postal_code: "94501-5047",
    country: "United States",
    longitude: "-122.306283180899",
    latitude: "37.7834497667258",
    phone: "4159326531",
    website_url: "http://almanacbeer.com",
    updated_at: "2018-08-23T23:24:11.758Z"
  },
  {
    id: 530,
    name: "Diving Dog Brewhouse",
    brewery_type: "micro",
    street: "1802 Telegraph Ave",
    city: "Oakland",
    state: "California",
    postal_code: "94612-2110",
    country: "United States",
    longitude: "-122.2698881",
    latitude: "37.807739",
    phone: "5103061914",
    website_url: "http://www.divingdogbrew.com",
    updated_at: "2018-08-23T23:27:26.494Z"
  },
  {
    id: 5494,
    name: "MadTree Brewing",
    brewery_type: "regional",
    street: "3301 Madison Rd",
    city: "Cincinnati",
    state: "Ohio",
    postal_code: "45209-1132",
    country: "United States",
    longitude: "-84.4239715",
    latitude: "39.1563725",
    phone: "5138368733",
    website_url: "http://www.madtreebrewing.com",
    updated_at: "2018-08-24T15:44:22.281Z"
  },
]