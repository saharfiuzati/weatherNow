import { Component, OnInit } from '@angular/core';
import {country} from '../country';
import { ApiService } from '../api.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {
  $allCountries: Observable<country[]>;
  $filteredCountries: Observable<country[]>;
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
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

  onFormSubmit() {
    
    this.apiService.getCountryByName(this.countryForm.value.country.place.name , this.countryForm.value.country.place.iso);
        
    this.apiService.saveCountry(this.countryForm.value);
    
    this.resetForm();
  }

  resetForm() {
    this.countryForm.reset();
  }
  
}


