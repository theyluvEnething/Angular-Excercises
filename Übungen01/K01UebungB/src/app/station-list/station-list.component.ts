import { Component, OnInit } from '@angular/core';
import { Station } from 'src/shared/station';
import { WeatherService } from 'src/shared/weather-service';
import { StationItemComponent } from '../station-item/station-item.component';
import { CommonModule } from '@angular/common';
import { StationValley } from 'src/shared/station-valley';

@Component({
  selector: 'ub-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
  standalone: true,
  imports: [
    StationItemComponent,
    CommonModule
  ]
})
export class StationListComponent implements OnInit {
  
  stations : StationValley[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getAll().subscribe({
      next: (stations) => (this.stations = stations),
      error: (data) => console.error("Error fetching Weather Data from Weather Station: " + data)
    });

    this.stations.sort((s1, s2) => s1.name.localeCompare(s2.name));

    console.log(this.stations)
  }


}
