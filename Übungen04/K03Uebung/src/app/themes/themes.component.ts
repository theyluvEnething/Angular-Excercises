import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndexedDbService } from '../services/indexed-db-service.service';
import { Theme } from 'src/shared/theme';
import { ThemeDialogComponent } from '../theme-dialog/theme-dialog.component';

@Component({
  selector: 'ib-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent {
  themes: Theme[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private Db: IndexedDbService) {}

  ngOnInit(): void {
    this.getThemesByDescription();
  }





  themeClicked(theme: Theme) {
    console.log(theme.description, ' clicked');
    const dialogRef = this.dialog.open(ThemeDialogComponent, {
      data: { theme: theme },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getThemesByDescription();
    });
  }
  
  onAddClick() {
    const dialogRef = this.dialog.open(ThemeDialogComponent, {});
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getThemesByDescription();
    });
  }
  
  getThemesByDescription() {
    this.Db.getThemesByDescription()
      .then((response: any[]) => {
        this.themes = response;
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Notizen:', error);
      });
  }
}