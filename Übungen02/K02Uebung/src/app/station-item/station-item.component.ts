import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { Station } from 'src/shared/station';
import { StationValley } from 'src/shared/station-valley';

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
  @Input() stationValley !: StationValley;
  Station = Station; // deklariere Klasse Station als Klasse Station
  
  stationData : StationData[] = [];

  constructor() {}

  ngOnInit() {
    this.stationData = [
      { description: Station.descriptions.t, value: this.stationValley.t, unit: Station.units.t },
      { description: Station.descriptions.rh, value: this.stationValley.rh, unit: Station.units.rh },
      { description: Station.descriptions.p, value: this.stationValley.p, unit: Station.units.p },
      { description: Station.descriptions.n, value: this.stationValley.n, unit: Station.units.n },
      { description: Station.descriptions.dd, value: this.stationValley.dd, unit: Station.units.dd },
      { description: Station.descriptions.ff, value: this.stationValley.ff, unit: Station.units.ff },
      { description: Station.descriptions.sd, value: this.stationValley.sd, unit: Station.units.sd },
      { description: Station.descriptions.gs, value: this.stationValley.gs, unit: Station.units.gs },
    ];
  }
}
