import { Component, inject, OnInit } from '@angular/core';
import { Theme } from '../../shared/theme';
import { Note } from '../../shared/note';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexedDbService } from '../services/indexed-db-service.service';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'ib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  private snackBar = inject(MatSnackBar);
  isPC !: boolean;

  constructor(private Db: IndexedDbService, private router: Router, private platform: Platform) {}

  ngOnInit(): void {
    this.isPC = !(this.platform.ANDROID || this.platform.IOS);

    this.Db.getNotesByTitle()
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
        this.notes = await this.Db.getNotesByTitle();
        break;

      case 'Thema':
        this.notes = [];
        this.notes = await this.Db.getNotesByTheme();
        break;

      case 'Änderungsdatum':
        this.notes = [];
        this.notes = await this.Db.getNotesByDate();
        break;

      default:
        break;
    }
  }

  addNote() {
    this.router.navigate(['/notes/add']);
  }

  editNote(note: Note) {
    console.log("edit")
    this.router.navigate(['/notes/edit/', note.id]);
  }
}
