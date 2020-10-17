import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BeerLayoutComponent } from './beer-layout/beer-layout.component';
import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BeerLayoutService {
  private beerUrl = 'http://ontariobeerapi.ca/beers/';
  // CORS Anywhere helps with accessing data from other websites that is normally forbidden by the same origin policy of web browsers
  private corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  totalAngularPackages;
  private isDarkMode: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.isDarkMode = new BehaviorSubject<any>({});
  }

  /** GET beers from the server */
  getBeers(): any {
    return this.http.get(this.corsAnywhereUrl+this.beerUrl);  
  }

  toggleTheme(theme) {
    this.isDarkMode.next(theme);
  }

  getTheme(): Observable<any> {
    if(this.isDarkMode) {
      return this.isDarkMode.asObservable();
    } else {
      this.isDarkMode.next('light');
      return this.isDarkMode.asObservable();
    }
    
  }
}
