import { Component, Input } from '@angular/core';
import { Measurement } from 'src/shared/measurement';

@Component({
  selector: 'ua-measurement-item',
  templateUrl: './measurement-item.component.html',
  styleUrls: ['./measurement-item.component.scss']
})
export class MeasurementItemComponent {
  @Input() measurement !: Measurement;
}
