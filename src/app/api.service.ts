import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { country } from './country';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'Z3grHRzOCyvFEPy7JXjHswKCTQois90s794UoXG2';
  API_ACCESSID = 'tF09e1lLSZXRid5tXkJDs';
  localUrl = 'assets/data/countries.json';
  private _name : string;
  private _iso : string;

  constructor(private httpClient: HttpClient , private _router: Router) { }
  public getWeather(){
    
    console.log(`https://api.aerisapi.com/observations/${this._name},${this._iso}?&format=json&filter=allstations&limit=1&client_id=${this.API_ACCESSID}&client_secret=${this.API_KEY}`);
    // countries :https://api.aerisapi.com/countries/search?query=area:500000&sort=name&limit=100&client_id=tF09e1lLSZXRid5tXkJDs&client_secret=Z3grHRzOCyvFEPy7JXjHswKCTQois90s794UoXG2
    return this.httpClient.get(`https://api.aerisapi.com/observations/${this._name},${this._iso}?&format=json&filter=allstations&limit=1&client_id=${this.API_ACCESSID}&client_secret=${this.API_KEY}`);
  }

  public getCountryByName(name : string , iso : string){
    debugger
    this._name = name;
    this._iso = iso;
  }

  public getCountries() : Observable<country[]> {
    return this.httpClient.get<country[]> (this.localUrl);
  }
  
  saveCountry(countries) {
    localStorage.setItem('countries', JSON.stringify(countries.country.place.name));
    this._router.navigate([`weather/${countries.country.place.name}`]);
  }
}
