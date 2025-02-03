import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../shared/weather-service';
import { StationValley } from '../../shared/station-valley';

@Component({
  selector: 'ua-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  stations!: StationValley[];
  sortOrder : string = "";



  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {
    let OldSortOrder : string = this.sortOrder;
    this.route.params.subscribe(params => {
      this.sortOrder = params['sortOrder'];
      console.log("SortOrder:", params['sortOrder']);
      if (OldSortOrder !== this.sortOrder) {
        this.weatherService.getAll(this.sortOrder).subscribe(stations => {
          this.stations = stations;
        });
      }
    });
  }


  navigateToCode(stationCode : string) {
    console.log(stationCode)
    // this.router.navigate([this.route.snapshot.routeConfig?.path, stationCode])
  }
}
