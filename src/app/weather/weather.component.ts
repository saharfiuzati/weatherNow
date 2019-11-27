import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  response
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    debugger
    this.apiService.getWeather().subscribe((data)=>{
      console.log(data);
      this.response = data['response'];
    });
  }
}
