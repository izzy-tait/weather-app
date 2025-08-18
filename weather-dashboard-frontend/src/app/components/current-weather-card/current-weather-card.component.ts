import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocationService } from 'src/app/geolocation.service';
import { CityInfo } from 'src/app/models/CityInfo.model';
import { WeatherInfo } from 'src/app/models/WeatherInfo.model';

@Component({
  selector: 'app-current-weather-card',
  templateUrl: './current-weather-card.component.html',
  styleUrls: ['./current-weather-card.component.scss']
})
export class CurrentWeatherCardComponent {
  @Input() cityName: string | undefined;
  @Input() coordinates!: CityInfo | undefined;

  public currentWeather$: Observable<WeatherInfo> | undefined;

  constructor(private _geolocationService: GeolocationService) {}

  ngOnChanges(): void {
    let body: CityInfo;
    if (this.coordinates != undefined) {
      body = {latitude: this.coordinates.latitude, longitude: this.coordinates.longitude };
      this.currentWeather$ = this._currentWeatherInfo(body);
    } else {
      console.log("Failed to retrieve city's coordinates");
    }
  }
  getWeatherImage(weatherInfo: WeatherInfo | null | undefined): string | undefined {
    if (!weatherInfo) return undefined;
    return weatherInfo.isDaytime ? 'assets/images/day.png' : 'assets/images/night.png';
  }

  private _currentWeatherInfo(body: CityInfo): Observable<WeatherInfo> {
     return this._geolocationService.getCurrentWeather(body);
  }
}
