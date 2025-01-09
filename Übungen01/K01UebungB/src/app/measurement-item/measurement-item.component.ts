import { Component, Input } from '@angular/core';
import { Measurement } from 'src/shared/measurement';

@Component({
  selector: 'ub-measurement-item',
  templateUrl: './measurement-item.component.html',
  styleUrls: ['./measurement-item.component.scss'],
  standalone: true
})
export class MeasurementItemComponent {
  @Input() measurement !: Measurement;
}
