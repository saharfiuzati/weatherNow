import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { country } from './country';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'Z3grHRzOCyvFEPy7JXjHswKCTQois90s794UoXG2';
  API_ACCESSID = 'tF09e1lLSZXRid5tXkJDs';
  localUrl = 'assets/data/countries.json';

  constructor(private httpClient: HttpClient) { }
  public getWeather(){
    debugger
    // countries :https://api.aerisapi.com/countries/search?query=area:500000&sort=name&limit=100&client_id=tF09e1lLSZXRid5tXkJDs&client_secret=Z3grHRzOCyvFEPy7JXjHswKCTQois90s794UoXG2
    return this.httpClient.get(`https://api.aerisapi.com/observations/france,fr?&format=json&filter=allstations&limit=1&client_id=${this.API_ACCESSID}&client_secret=${this.API_KEY}`);
  }

  public getCountries() : Observable<country[]> {
    //const ALL_Countries: country[] = this.httpClient.get(this.localUrl);
    return this.httpClient.get<country[]> (this.localUrl);
  }
  saveCountry(countries) {
    console.log(JSON.stringify(countries));
  }
}
