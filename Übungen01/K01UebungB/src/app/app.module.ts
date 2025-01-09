import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StationListComponent } from './station-list/station-list.component';
import { StationItemComponent } from './station-item/station-item.component';

import { WeatherService } from '../shared/weather-service';
import { HttpClientModule } from '@angular/common/http';
import { SearchTermComponent } from './search-term/search-term.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    StationItemComponent,
    StationListComponent
],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
