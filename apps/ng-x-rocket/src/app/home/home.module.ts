import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@ng-x-rocket/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Weather } from 'weather';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, Weather],
  declarations: [HomeComponent],
})
export class HomeModule {}
