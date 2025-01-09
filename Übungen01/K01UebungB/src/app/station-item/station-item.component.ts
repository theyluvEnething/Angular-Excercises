import { Component, Input, OnInit } from '@angular/core';
import { Station } from 'src/shared/station';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatList, MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StationValley } from 'src/shared/station-valley';
import { ArrayType, ImplicitReceiver } from '@angular/compiler';
import { MatTableModule } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MeasurementItemComponent } from '../measurement-item/measurement-item.component';

interface StationData {
  description: string;
  value: number | string;  // or string, depending on your actual data
  unit: string | null;
}

@Component({
  selector: 'ub-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss'],
  standalone: true,
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    MatTableModule,
    MeasurementItemComponent
  ] 
})
export class StationItemComponent implements OnInit {
  @Input() stationValley !: StationValley;
  Station = Station; 

  stationData : StationData[] = [];

  isBigScreen : boolean = true;

  constructor(private breakpointObserver: BreakpointObserver) {}

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

    this.breakpointObserver
    .observe('(max-width: 600px)')  // gelöst durch Schauen ob max-width < 600px ist. lt-sm ist genau 600px
    .subscribe((result) => (this.isBigScreen = !result.matches));
  }

  isTrue() {
    return true;
  }

}
