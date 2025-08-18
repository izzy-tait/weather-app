import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import { Component } from '@angular/core';
import { GeolocationService } from 'src/app/geolocation.service';
import { CityInfo } from './models/CityInfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'weather-dashboard';
  public coordinates: CityInfo | undefined;
  public cityName: string | undefined;

  constructor(
    private _geolocationService: GeolocationService
  ){}

  onSearch(city: String) {
    this._geolocationService.getCityCoordinates(city)
    .subscribe(data => {
      this.coordinates = { latitude: data.latitude, longitude: data.longitude} ;
      this.cityName = data.cityName;
    })
  }
}
