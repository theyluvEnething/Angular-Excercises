import { Component, OnInit } from '@angular/core';
import { Station } from 'src/shared/station';
import { WeatherService } from 'src/shared/weather-service';
import { StationItemComponent } from '../station-item/station-item.component';
import { CommonModule } from '@angular/common';
import { StationValley } from 'src/shared/station-valley';
import { SearchTermComponent } from '../search-term/search-term.component';

@Component({
  selector: 'ub-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
  standalone: true,
  imports: [
    StationItemComponent,
    SearchTermComponent,
    CommonModule
  ]
})
export class StationListComponent implements OnInit {
  
  stations : StationValley[] = [];
  searchedStations : StationValley[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getAll().subscribe(stations => {
      this.stations = stations;
      this.stations.sort((s1, s2) => s1.name.localeCompare(s2.name));
      this.searchedStations = this.stations;
      console.log(this.stations)
    });
  }

  onSearchTermChange(searchedValleys : StationValley[]) {
    if (searchedValleys.length > 0) {
      this.searchedStations = searchedValleys; 
    } else {
      this.searchedStations = this.stations;
    }
    console.log("Searched Valleys found: " + searchedValleys);
  }
}
