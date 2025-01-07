  import { Component, HostListener, Input, OnInit } from '@angular/core';
  import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
  import { Person } from 'src/shared/person';
  import { MatCardModule } from '@angular/material/card';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailListComponent } from "../email-list/email-list.component";
import { CarListComponent } from "../car-list/car-list.component";

  @Component({
    selector: 'ua-person-item',
    templateUrl: './person-item.component.html',
    styleUrls: ['./person-item.component.scss'],
    standalone: true,
    imports: [
    BrowserAnimationsModule,
    MatCardModule,
    EmailListComponent,
    EmailListComponent,
    CarListComponent
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class PersonItemComponent implements OnInit {
    @Input() person!: Person;

    descriptionClass: string = 'description-side'; // Default class

    ngOnInit(): void {
      this.updateClass(window.innerWidth); // Set initial class based on window size
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
      this.updateClass(event.target.innerWidth);
    }

    private updateClass(width: number): void {
      this.descriptionClass = width > 768 ? 'description-side' : 'description-below';
    }
  }
