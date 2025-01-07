import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ua-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class EmailListComponent {
  @Input() emailAdressen : string[] = [];
}
