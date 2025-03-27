import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../shared/user';
import { Note } from '../../shared/note';
import { Theme } from '../../shared/theme';
import { v4 as uuidv4 } from 'uuid';
import { IndexedDbService } from '../services/indexed-db-service.service';
import { ThemeDialogComponent } from '../theme-dialog/theme-dialog.component';


@Component({
  selector: 'ib-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.scss']
})
export class NotesDetailComponent {
  formGroup: FormGroup;

  note: Note | null = null;
  user: User = new User('sepp@hintner.com', 'sepp');
  refThemes: Theme[] = [];
  
  title: string = '';
  text: string = '';
  theme: Theme | null = null;
  
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  constructor(private Db: IndexedDbService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      theme: [null, Validators.required],
    });
  }

  compareThemes = (a: any, b: any) => a && b && a.id === b.id;

  async ngOnInit(): Promise<void> {
    this.refThemes = await this.getThemes();

    const snapshotId = this.route.snapshot.paramMap.get('id');  
    if (snapshotId) {
      this.note = await this.Db.getNoteById(snapshotId);
      if (this.note?.title) this.title = this.note?.title;
      if (this.note?.text) this.text = this.note?.text;
      if (this.note?.theme) this.theme = this.note?.theme;
    }
  }

  // saveNote() {
  //   if (this.note) {
  //     this.updateNote(this.note)
  //     return;
  //   } 
  //   const note: Note = new Note(uuidv4(),this.title, this.text, 0, 0, this.theme, this.user);
  //   this.Db.addNote(note);
  // }

  updateNote(note: Note) {
    this.Db.updateNote(note);
  }

  async deleteNote() {
    if (this.note) {
      try {
        await this.Db.deleteNote(this.note.id);
        this.snackBar.open('Note gelöscht', 'OK', { duration: 3000 });
        this.router.navigate(['/']);
      } catch (error) {
        this.snackBar.open('Fehler: ' + error, 'OK', { duration: 3000 });
      }
    }
  }

  async editNote() {
    if (!this.title || !this.text || !this.theme) {
      this.snackBar.open('Bitte alle Werte angeben', 'OK', {
        duration: 3000,
      });
      return;
    }
    if (this.note) {
      this.note.title = this.title;
      this.note.text = this.text;
      this.note.theme = this.theme;
      await this.Db.updateNote(this.note);
      this.snackBar.open('Note geändert', 'OK', { duration: 3000 });
      this.router.navigate(['/']);
    } else {
      this.snackBar.open('Bitte füllen Sie alle Felder aus', 'OK', {
        duration: 3000,
      });
    }
  }

  async addNote() {
    if (!this.title || !this.text || !this.theme) {
      this.snackBar.open('Bitte alle Werte angeben', 'OK', { duration: 3000, });
      return;
    }
    const note = new Note(uuidv4(), this.title, this.text, 0, 0, this.theme, this.user);
    return this.Db.addNote(note).then(res => {
      this.router.navigate(['/home']);
    });
  }



  
  async addTheme() {
    const dialogRef = this.dialog.open(ThemeDialogComponent);
    dialogRef.afterClosed().subscribe(async addedTheme => {
      this.theme = addedTheme;
      this.refThemes = await this.getThemes()
    });
  }

  async getThemes() {
    return this.Db.getThemesByDescription()
  }
}
