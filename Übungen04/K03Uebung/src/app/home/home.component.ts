import { Component, inject, OnInit } from '@angular/core';
import { Theme } from '../../shared/theme';
import { Note } from '../../shared/note';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexedDbService } from '../services/indexed-db-service.service';
@Component({
  selector: 'ib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  private snackBar = inject(MatSnackBar);

  constructor(private DB: IndexedDbService, private router: Router) {}

  ngOnInit(): void {
    this.DB.getNotesByTitle()
      .then((result: any[]) => {
        this.notes = result;
      })
      .catch((err) => {
        console.error('Error loading notes:', err);
      });
  }

  filters = [{ name: 'Titel' }, { name: 'Thema' }, { name: 'Änderungsdatum' }];
  selectedFilter = { name: 'Titel' }; // default is "Titel" 

  async filterNotes(evt: any, option: any) {
    if (!evt.isUserInput) return;
    
    if (option === this.selectedFilter) {
      evt.source.selected = true;
      this.snackBar.open('A filter must be selected', 'OK', { duration: 3000 });
      return;
    }
    
    this.selectedFilter = option;
    switch (option.name) {
      case 'Titel':
        this.notes = [];
        this.notes = await this.DB.getNotesByTitle();
        break;

      case 'Thema':
        this.notes = [];
        this.notes = await this.DB.getNotesByTheme();
        break;

      case 'Änderungsdatum':
        this.notes = [];
        this.notes = await this.DB.getNotesByDate();
        break;

      default:
        break;
    }
  }

  openNote(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }

  addNote() {
    this.router.navigate(['/add']);
  }

  editNote(note: Note) {
    this.router.navigate(['/edit', note.id]);
  }
}
