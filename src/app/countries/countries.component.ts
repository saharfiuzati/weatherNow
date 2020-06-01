import { Component, OnInit } from '@angular/core';
import {country} from '../country';
import { ApiService } from '../api.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { cardinfo } from '../cardinfo';
import { element } from 'protractor';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {
  $allCountries: Observable<country[]>;
  $filteredCountries: Observable<country[]>;
  name : string;
  continent : string;
  capital : string;
  tempreture : Number;
  private neighbors :  country[];
  cardinfos : cardinfo[] = [];
  value = 'Clear me';

  neighborname : string;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    
    localStorage.clear();
    this.$allCountries = this.apiService.getCountries();
        
    this.$filteredCountries = this.country.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.filterCountries(value))
      );
  }

  private filterCountries(value: string | country) {
    let filterValue = '';
    if (value) {
      filterValue = typeof value === 'string' ? value.toLowerCase() : value.place.name.toLowerCase();
      
      return this.$allCountries.pipe(
        map(country => country.filter(country => country.place.name.toLowerCase().includes(filterValue)))
      );
    } else {
      return this.$allCountries;
    }

  }

  private displayFn(country?: country): string | undefined {
    return country ? country.place.name : undefined;
  }

  countryForm = this.formBuilder.group({
    country: [null, Validators.required]
  });

  get country() {
    return this.countryForm.get('country');
  }

  async onFormSubmit() {

    this.apiService.saveCountry(this.countryForm.value);    
    this.name = this.countryForm.value.country.place.name;    
    this.continent = this.countryForm.value.country.place.continentFull;    
    this.capital = this.countryForm.value.country.profile.capital;  
    const degree = Math.floor(Math.random()*(30-5+1)+5);
    
    this.neighbors = await this.apiService.FetchNeighbors(this.countryForm.value.country.profile.neighbors);
    this.cardinfos.push({
      name: this.name,
      continent: this.continent,
      capital: this.capital,
      neighbors : this.neighbors ,
      tempreture : degree,
      hightempreture : Math.floor(Math.random()*(30-degree+1)+degree) ,
      lowtempreture : Math.floor(Math.random()*(degree-0+1)+0)
    });
                
    this.resetForm();
  }

  resetForm() {
    this.countryForm.reset();
  }
  
}


