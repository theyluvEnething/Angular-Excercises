import { Component } from '@angular/core';
import { Address, Car, Person } from 'src/shared/person';
import { PersonItemComponent } from '../person-item/person-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ua-person-list',
  templateUrl: './person-list.component.html',
  template: `<ua-person-list></ua-person-list>`,
  styleUrls: ['./person-list.component.scss'],
  imports: [ CommonModule, PersonItemComponent ],
  standalone: true
})
export class PersonListComponent {
  public persons : Person[];

  constructor() {
    this.persons = [
      new Person(
        'Sepp Hintner',
        new Date('December 1, 1999'),
        1.87,
        true,
        [
          'sepp.hintner@rolmail.net',
          'sepp.hintner@hotmail.com',
          'sepp.hintner@gmail.com'
        ],
        [
          new Car('AG670XL', 'Opel Corsa', 1995, 'https://upload.wikimedia.org/wikipedia/commons/6/61/Opel_Corsa_C_1.2_Elegance_front_20100912.jpg'),
          new Car('BK368SR', 'Opel Astra', 2000, 'https://upload.wikimedia.org/wikipedia/commons/1/15/Opel_Astra_G_5-doors.JPG'),
          new Car('EN734SO', 'Opel Insignia', 2017, 'https://upload.wikimedia.org/wikipedia/commons/6/6c/' +
            'Opel_Insignia_2.0_BiTurbo_CDTI_Sport_OPC_Line-Paket_%E2%80%93_Frontansicht%2C_3._April_2012%2C_Velbert.jpg')
        ],
        new Address('Drususallee 33', '39100 Bozen'),
        'http://www.google.de',
        undefined,
        'https://upload.wikimedia.org/wikipedia/commons/8/81/Alexej_von_Jawlensky_%28selfportrait%29.jpeg'
      ),
      new Person(
        'Agatha Agreiter',
        new Date('October 1, 2001'),
        1.80,
        false,
        [],
        [],
        { streetnumber: 'Am Graben 130/A', postcodetown: '39031 Bruneck' },
        'http://www.google.de',
        undefined,
        'https://upload.wikimedia.org/wikipedia/commons/a/ad/Alexej_Jawlensky_-_Schokko_with_Red_Hat_%281909%29.jpg'
      )
    ];
  }

}
