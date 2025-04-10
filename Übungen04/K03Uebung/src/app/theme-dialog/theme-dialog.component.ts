import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { Theme } from '../../shared/theme';
import { IndexedDbService } from '../services/indexed-db-service.service';

@Component({
  selector: 'app-theme-dialog',
  templateUrl: './theme-dialog.component.html',
  styleUrls: ['./theme-dialog.component.scss'],
})
export class ThemeDialogComponent implements OnInit {
  description: string = '';
  isEditMode: boolean = false;
  theme!: Theme; // für edit mode
  private snackBar = inject(MatSnackBar);

  constructor(
    private Db: IndexedDbService,
    private dialogRef: MatDialogRef<ThemeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { theme?: Theme }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.theme) {
      this.isEditMode = true;
      this.theme = this.data.theme;
      this.description = this.theme.description;
    }
  }

  async onSubmit() {
    if (!this.description) {
      this.snackBar.open('Bitte Beschreibung eingeben', 'OK', { duration: 3000 });
      return;
    }
    if (this.isEditMode) {
      await this.changeTheme();
    } else {
      await this.addTheme();
    }
  }

  async addTheme() {
    try {
      const newTheme = new Theme(uuidv4(), this.description);
      const createdTheme = await this.Db.addTheme(newTheme);
      this.snackBar.open('Thema erfolgreich erstellt', 'OK', { duration: 3000 });
      this.dialogRef.close(createdTheme);
    } catch (error) {
      console.error('Error adding theme:', error);
    }
  }

  async changeTheme() {
    const oldDescription = this.theme.description;
    
    try {
      if (this.theme.description === this.description) {
        this.snackBar.open('Thema wurde nicht verändert', 'Error', { duration: 3000 });
        return
      }

      const existingTheme = await this.Db.getThemeByDescription(this.theme.description);
      this.theme.description = this.description;
      await this.Db.updateTheme(this.theme);
      this.snackBar.open('Thema erfolgreich aktualisiert', 'OK', { duration: 3000 });
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }

  async onDelete() {
    if (!this.isEditMode) return;
    
    try {
      await this.Db.deleteTheme(this.theme);
      this.snackBar.open('Thema erfolgreich gelöscht', 'OK', { duration: 3000 });
      this.dialogRef.close();
    } catch (error) {
      this.snackBar.open('Das Thema wird noch benutzt', 'OK');
    }
  }
}
