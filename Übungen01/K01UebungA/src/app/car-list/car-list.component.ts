import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Car } from 'src/shared/car';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ua-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ]
})
export class CarListComponent implements OnInit{
  @Input() cars: Car[] = [];
  filteredCars : Car[] = [];
  yearToFilterBy: number | null = null;
  
  ngOnInit() {
    this.filteredCars = this.cars;
  }

  

  filterCars() {
    var numberYear : number = 0;
    if (numberYear = Number(this.yearToFilterBy)) {
      this.filteredCars = this.cars.filter(car => car.registrationyear < numberYear);
    } else {
      this.filteredCars = this.cars;
    }
  }
}
