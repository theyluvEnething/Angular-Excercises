import { Component, Input } from '@angular/core';
import { Station } from 'src/shared/station';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatList, MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ub-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ] 
})
export class StationItemComponent {
  @Input() station !: Station;
}
