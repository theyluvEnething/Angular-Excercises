import { Component, Input } from '@angular/core';
import { Station } from 'src/shared/station';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatList, MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


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
    MatListModule
  ] 
})
export class StationItemComponent {
  @Input() station !: Station;
}
