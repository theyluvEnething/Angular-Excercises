import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Measurement } from 'src/shared/measurement';

import { Station } from 'src/shared/station';
import { StationValley } from 'src/shared/station-valley';
import { WeatherService } from 'src/shared/weather-service';

interface StationData {
  description: string;
  value: number | string;
  unit: string | null;
}

@Component({
  selector: 'ua-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss'],
})
export class StationItemComponent implements OnInit {
  stationValley !: StationValley;
  measurements : Measurement[] = [];

  Station = Station; // deklariere Klasse Station als Klasse Station um zugriff aus template zu erlauben
  
  sortOrder : string = ""
  stationCode : string = ""

  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private ws: WeatherService) {}

  ngOnInit() {
    console.log("Loading StationItemComponent");
    this.route.params.subscribe(params => {
      this.sortOrder = params['sortOrder'];
      this.stationCode = params['code'];

      console.log("SortOrder: ", this.sortOrder);
      console.log("StationCode:", this.stationCode);
    
      this.ws.getStation(this.stationCode).subscribe(foundStation => {
        this.stationValley = foundStation;

        this.measurements = this.stationValley.measurements
        for (let measurement of this.measurements) {
          console.log(measurement.code)
        }

        switch (this.sortOrder) {
          case "temperature":
            this.measurements = this.stationValley.measurements.filter(measurement => measurement.code === "LT");
            break;
          case "precipitation":
            this.measurements = this.stationValley.measurements.filter(measurement => measurement.code === "N");
            break;
          case "airpressure":
            this.measurements = this.stationValley.measurements.filter(measurement => measurement.code === "LD.RED");
            break;
          default:
            this.measurements = this.stationValley.measurements
            break;
        }
      },
        error => {
          console.error("Error fetching Station from Route:", error);
      });
    });
  }

  backToStations() {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    const currentSegments = currentUrlTree.root.children['primary']?.segments.map(s => s.path) || [];
    if (currentSegments.length > 1) {
      currentSegments.pop();
      this.router.navigate([`/${currentSegments.join('/')}`]);
    }
  }
}
