import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createHttpParams } from 'helpers';

interface WeatherData {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
  };
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class WeatherState {
  private http: HttpClient = inject(HttpClient);
  private weatherState = signal<{ [key: string]: string }>({});

  readonly state = this.weatherState.asReadonly();

  public getWeather(): Observable<{ [key: string]: string }> {
    const params = {
      latitude: 52.52,
      longitude: 13.41,
      daily: ['temperature_2m_max', 'temperature_2m_min'],
    };

    return this.http
      .get<WeatherData>('https://api.open-meteo.com/v1/forecast', { params: createHttpParams(params) })
      .pipe(
        map((data: WeatherData) => {
          const weatherState = this.formWeatherState(data);

          this.setWeatherState(weatherState);

          return weatherState;
        }),
      );
  }

  private setWeatherState(state: { [key: string]: string }): void {
    this.weatherState.set(state);
  }

  private formWeatherState(data: WeatherData): { [key: string]: string } {
    const weatherState: { [key: string]: string } = {};

    data.daily.time.forEach((day, index) => {
      const minTemperature = data.daily.temperature_2m_min[index] + data.daily_units.temperature_2m_min;
      const maxTemperature = data.daily.temperature_2m_max[index] + data.daily_units.temperature_2m_max;
      weatherState[day] = minTemperature + ', ' + maxTemperature;
    });

    return weatherState;
  }
}
