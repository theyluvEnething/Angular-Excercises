import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherService } from 'src/shared/weather-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';


// Flex Layout Module
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationItemComponent } from './station-item/station-item.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MeasurementItemComponent } from './measurement-item/measurement-item.component';
import { Station } from 'src/shared/station';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SearchStationComponent } from './search-station/search-station.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StationListComponent,
    StationItemComponent,
    MeasurementItemComponent,
    SearchStationComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,

    FlexLayoutModule,
    HttpClientModule,
    
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
