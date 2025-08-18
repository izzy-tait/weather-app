import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { CityInfo } from './models/CityInfo.model';
import { WeatherInfo } from './models/WeatherInfo.model';
import { WeatherData } from './models/WeatherInfo.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private _domain: String;

  constructor(private _http: HttpClient) { 
    this._domain = "http://localhost:8000";
  }

  getCityCoordinates(city: String): Observable<CityInfo> {
    return this._http.get<[CityInfo]>(`${this._domain}/weather/get-city-coordinates?city=${city}`)
    .pipe(
      map(r => r[0])
    );
  }

  getCurrentWeather(coordinates: CityInfo): Observable<WeatherInfo> {
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;
  
    return this._http.get<WeatherData>(`${this._domain}/weather/current-weather?lat=${lat}&lon=${lon}`)
    .pipe(
      map(data => new WeatherInfo(data)),
      tap(data => console.log(data))
    );
  }
}
