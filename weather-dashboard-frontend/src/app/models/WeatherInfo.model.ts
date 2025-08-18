export interface WeatherData {
    current: {
      temperature_2m: number;
      relative_humidity_2m: number;
      rain: number;
      wind_speed_10m: number;
      cloud_cover: number;
      is_day: number;
    },
    current_units: {
        temperature_2m: string;
        relative_humidity_2m: string;
        rain: string;
        wind_speed_10m: string;
        cloud_cover: string;
    },
    daily: {
        temperature_2m_min: number;
        temperature_2m_max: number;
    },
    daily_units: {
        temperature_2m_max: string;
        temperature_2m_min: string;
    }
  }

export class WeatherInfo {
    public temperature: {value: number, units: string};
    public relative_humidity: {value: number, units: string};
    public rain: {value: number, units: string};
    public wind_speed: {value: number, units: string};
    public minTemperature?: {value: number, units: string};
    public maxTemperature?: {value: number, units: string};
    public cloudCover: {value: number, units: string};
    public isDaytime: boolean;

    constructor(data: WeatherData) {
        this.temperature = {
            value: data.current.temperature_2m,
            units: data.current_units.temperature_2m
        };
        this.relative_humidity = {
            value: data.current.relative_humidity_2m,
            units: data.current_units.relative_humidity_2m
        };
        this.rain = {
            value: data.current.rain,
            units: data.current_units.rain
        };  
        this.wind_speed = {
            value: data.current.wind_speed_10m,
            units: data.current_units.wind_speed_10m
        };
        this.minTemperature = {
            value: data.daily.temperature_2m_min,
            units: data.daily_units.temperature_2m_min
        }
        this.maxTemperature = {
            value: data.daily.temperature_2m_max,
            units: data.daily_units.temperature_2m_max
        }
        this.cloudCover = {
            value: data.current.cloud_cover,
            units: data.current_units.cloud_cover
        };
        this.isDaytime = data.current.is_day === 1 ? true : false;
    }
}  