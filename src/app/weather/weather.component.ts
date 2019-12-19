import { Component, OnInit , Input} from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  response
  
  constructor(private apiService: ApiService , private route: ActivatedRoute) { }

  ngOnInit() {

    this.apiService.getWeather().subscribe((data)=>{
      this.response = data['response'];
    });
  }
}
