import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../shared/weather-service';
import { StationValley } from '../../shared/station-valley';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'ua-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  stations : StationValley[] = [];
  filteredStations!: StationValley[];
  sortOrder : string = "";

  stationControl = new FormControl();

  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private router: Router) {}

  private _filter(value: string): StationValley[] {
    const filterValue = value.toLowerCase();
    return this.stations.filter(station =>
      station.name.toLowerCase().includes(filterValue)
    );
  }

  selectCompletion(searchTerm: string) : void {
    let selectedStations = this._filter(searchTerm)
    if (selectedStations.length > 0) { // man könnte auch === 1 machen, jedoch, könnte sein das Liste Duplikate enthält, und so werden auch diese abgefangen.
      let selectedStation = selectedStations[0]
      this.router.navigate(['/stations', this.sortOrder, selectedStation.code]);
    }
  }

  updateAutoComplete(searchTerm: string) : void {
    this.filteredStations = this._filter(searchTerm)
  }

  ngOnInit() {
    console.log("Loading StationListComponent");
    let OldSortOrder : string = this.sortOrder;
    this.route.params.subscribe(params => {
      this.sortOrder = params['sortOrder'];
      console.log("SortOrder:", params['sortOrder']);
      if (OldSortOrder !== this.sortOrder) {
        this.weatherService.getAll(this.sortOrder).subscribe(stations => {
          this.stations = stations;
          this.filteredStations = this.stations;
        });
      }
    });
  }
}
