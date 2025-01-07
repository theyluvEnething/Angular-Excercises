import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Address, Car, Person } from 'src/shared/person';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonItemComponent } from './person-item/person-item.component';
import { EmailListComponent } from './email-list/email-list.component';
import { CarListComponent } from './car-list/car-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PersonListComponent,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit { 

    constructor() {
      // Sortiert das Personen Array nach aufsteigendem Alter
      this.sortPersonenByAge()
    }

    ngOnInit(): void {}

    private sortPersonenByAge() {
      const beispielAdress : Address = new Address('123 Main St, 12A', '1010 Vienna');
      const beispielCars: Car[] = [
        new Car('W123ABC', 'BMW 3 Series', 2018, 'https://example.com/bmw.jpg'),
        new Car('X456DEF', 'Audi A4', 2020, 'https://example.com/audi.jpg'),
      ];
      

      let personenArray : Person[] = [
        new Person('Simon Hassler', new Date(2012, 5, 14), 20,true,[ 'david.miller@example.com'],beispielCars,beispielAdress,'https://davidmiller.com','Dave','https://example.com/david.jpg'),
        new Person('David Miller', new Date(2000, 1, 1), 185,true,[ 'david.miller@example.com'],beispielCars,beispielAdress,'https://davidmiller.com','Dave','https://example.com/david.jpg'),
        new Person('Lukas Fink', new Date(2003, 5, 14), 182,true,[ 'david.miller@example.com'],beispielCars,beispielAdress,'https://davidmiller.com','Dave','https://example.com/david.jpg'),
        new Person('Jakob Al Hasan', new Date(2008, 5, 14), 182,true,[ 'david.miller@example.com'],beispielCars,beispielAdress,'https://davidmiller.com','Dave','https://example.com/david.jpg'),
        new Person('Noah Seebachui', new Date(1999, 5, 14), 20,true,[ 'david.miller@example.com'],beispielCars,beispielAdress,'https://davidmiller.com','Dave','https://example.com/david.jpg')
      ];
      

      for (let i = 0; i < personenArray.length; i++) {
        console.log((i+1) + ". Person: " + personenArray[i].name, + ", Alter: " + personenArray[i].ageInYears)
      }

      personenArray.sort((a, b) => a.ageInYears - b.ageInYears)

      for (let i = 0; i < personenArray.length; i++) {
        console.log((i+1) + ". Person: " + personenArray[i].name, + ", Alter: " + personenArray[i].ageInYears)
      }

    
      // Filter-Methode: Personen mit Namen beginnend mit 'A'
      const filteredPersons = personenArray.filter(person => person.name.startsWith('A'));     
      for (let i = 0; i < filteredPersons.length; i++) {
        console.log((i+1) + ". Person: " + filteredPersons[i].name, + ", Alter: " + filteredPersons[i].ageInYears)
      }
    }
}
