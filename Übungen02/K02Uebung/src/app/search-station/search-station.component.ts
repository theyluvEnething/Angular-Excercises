import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StationValley } from 'src/shared/station-valley';
import { WeatherService } from 'src/shared/weather-service';
import { StationListComponent } from '../station-list/station-list.component';

@Component({
  selector: 'ua-search-station',
  templateUrl: './search-station.component.html',
  styleUrls: ['./search-station.component.scss']
})
export class SearchStationComponent implements OnInit {
  @Input("sortOrder") sortOrder : string = ""
  
  filteredStations : StationValley[] = []
  private stations !: StationValley[]

  searchTerm : string = ""
  
  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getAll(this.sortOrder).subscribe(stations => {
      this.stations = stations 
    })
    this.filteredStations = this.stations;
  }

  private _filter(value: string): StationValley[] {
    this.filteredStations = this.stations;
    const filterValue = value.toLowerCase();
    return this.filteredStations.filter(station =>
      station.name.toLowerCase().includes(filterValue)
    );
  }

  updateAutoComplete(searchTerm: string) : void {
    this.filteredStations = this._filter(searchTerm)
  }


  selectCompletion(searchTerm: string) : void {
    let selectedStations = this._filter(searchTerm)
    if (selectedStations.length > 0) { // man könnte auch === 1 machen, jedoch, könnte sein das Liste Duplikate enthält, und so werden auch diese abgefangen.
      let selectedStation = selectedStations[0]
      this.router.navigate(['/stations', this.sortOrder, selectedStation.code]);
    }
  }

  onOptionSelected(searchTerm: string) : void {
    this.selectCompletion(searchTerm);
  }
}
