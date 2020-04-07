import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {country} from './country';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'Z3grHRzOCyvFEPy7JXjHswKCTQois90s794UoXG2';
  API_ACCESSID = 'tF09e1lLSZXRid5tXkJDs';
  localUrl = 'assets/data/countries.json';
  private _name : string;
  private _iso : string;
  countries : Observable<country[]>;
  //private results :any[] = []
  private results :  country[];

  constructor(private httpClient: HttpClient , private _router: Router ) { }
  
  public getCountryByName(name : string , iso : string){
    
    this._name = name;
    this._iso = iso;
  }

  public getCountries() : Observable<country[]> {
    return this.httpClient.get<country[]> (this.localUrl);
  }
  
  saveCountry(country) {
    localStorage.setItem(`country:${country.country.place.name}`, JSON.stringify(country.country.place.name));
    //this._router.navigate([`weather/${countries.country.place.name}`]);
  }

  async FetchNeighbors(neighbors) {    
    const countries = await this.httpClient.get<country[]> (this.localUrl).toPromise(); 
    const result = neighbors.map(n => {
      return countries.filter(c => c.place.iso.includes(n))[0];
    });
         
    return result;
  }
 
}
