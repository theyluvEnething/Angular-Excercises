import { Component } from '@angular/core';

@Component({
  selector: 'ib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen : boolean = false;


  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
