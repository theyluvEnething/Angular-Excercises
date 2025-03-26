import { Component } from '@angular/core';
import { IndexedDbService } from './services/indexed-db-service.service';
import { Theme } from 'src/shared/theme';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen : boolean = false;
  
  constructor(private DB: IndexedDbService) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  title = 'PWA-Notes';

  ngOnInit(): void {
    const theme: Theme = new Theme(uuidv4(), 'Banane');
    console.log(theme.description);
    this.DB.addTheme(theme)
      .then((res) => {
        console.log('Erfolgreich hinzugefügt');
        theme.description = 'Banana';
        this.DB.updateTheme(theme).then((res) => {
          console.log('Erfolgreich geändert');
          this.DB.deleteTheme(theme).then((res) =>
            console.log('Erfolgreich gelöscht')
          );
        });
      })
      .catch((err) => console.log(err));
    this.DB.getThemeByDescription('Birnen')
      .then((res) =>
        this.DB.deleteTheme(res).then((res) =>
          console.log('Erfolgreich gelöscht')
        )
      )
      .catch((err) => console.log(err));
    this.DB.getThemeByDescription('Birnen')
      .then((res) => {
        res.description = 'Birnem';
        this.DB.updateTheme(res).then((res) =>
          console.log('Erfolgreich geändert')
        );
      })
      .catch((err) => console.log(err));
  }
}

