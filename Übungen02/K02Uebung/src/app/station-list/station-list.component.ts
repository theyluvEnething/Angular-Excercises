import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../shared/weather-service';
import { StationValley } from '../../shared/station-valley';

@Component({
  selector: 'ua-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent {
  stations!: StationValley[];
  sortOrder : string = "";

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("Route changed, new params:", params);
      const sortOrder = params['sortOrder'];
      this.weatherService.getAll(sortOrder).subscribe(stations => {
        this.stations = stations;
      });
    });
  }
}
