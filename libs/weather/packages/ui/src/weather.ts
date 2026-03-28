import { Component, inject, computed } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BlockBuilder } from 'block-builder';
import { WeatherState } from '../../state';

@UntilDestroy()
@Component({
  selector: 'lib-weather',
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  imports: [BlockBuilder, MatButtonModule],
})
export class Weather {
  private state = inject(WeatherState);

  public weatherState = computed(() => (Object.keys(this.state.state()).length ? this.state.state() : null));

  public getWeather(): void {
    this.state.getWeather().pipe(untilDestroyed(this)).subscribe();
  }
}
