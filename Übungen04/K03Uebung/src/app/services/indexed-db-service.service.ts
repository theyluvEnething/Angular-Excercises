import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { Theme } from '../../shared/theme';
import { Note } from '../../shared/note';
import { User } from '../../shared/user';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService extends Dexie {
  private notes!: Dexie.Table<Note, string>;
  private themes!: Dexie.Table<Theme, string>;

  constructor() {
    console.log('DbService wird initialisiert!');
    super('notes-db');
    this.version(1).stores({
      notes: 'id, title, [theme.description+title], theme.id, [modificationDate+creationDate]',
      themes: 'id, &description',
    });
    this.notes.mapToClass(Note);
    this.themes.mapToClass(Theme);
    this.on('populate', async () => {
      try {
        const t1 = new Theme(uuidv4(), 'Bananen');
        const t2 = new Theme(uuidv4(), 'Birnen');
        const t3 = new Theme(uuidv4(), 'Ananas');
        await this.themes.bulkAdd([t1, t2, t3]);
        const u = new User('sepp@hintner.com', 'sepp');
        const n1 = new Note(uuidv4(), 'Titel1', 'Text1', moment().valueOf(), 0, t2, u, false);
        const n2 = new Note(uuidv4(), 'Titel2', 'Text2', moment().valueOf(), 0, t1, u, false);
        await this.addNote(n1);
        await this.addNote(n2);
      } catch (err) {
        console.log(err);
      }
    });
    console.log('DbService wurde erstellt!');
  }

  async getThemesByDescription() {
    return this.themes.orderBy('description').toArray();
  }

  async getThemeByDescription(description: string) {
    const result = await this.themes.where('description').equals(description).first();
    return result ? result : Promise.reject('Theme not found');
  }

  async getNotesByTitle() {
    return this.notes.orderBy('title').toArray();
  }

  async getNotesByTheme() {
    return this.notes.orderBy('[theme.description+title]').toArray();
  }

  async getNotesByDate() {
    return this.notes.orderBy('[modificationDate+creationDate]').reverse().toArray();
  }

  async getNotes(description: string) {
    return this.notes.where('theme.description').equals(description).sortBy('title');
  }

  async addTheme(theme: Theme) {
    return this.themes.add(theme);
  }

  async deleteTheme(theme: Theme) {
    const relatedNotes = await this.getNotes(theme.description);
    return relatedNotes.length ? Promise.reject('Theme in use') : this.themes.delete(theme.id);
  }

  async updateTheme(theme: Theme) {
    await this.themes.update(theme.id, theme);
    return this.notes.where('theme.id').equals(theme.id).modify({
      theme: new Theme(theme.id, theme.description),
      modificationDate: moment().valueOf(),
    });
  }

  async addNote(note: Note) {
    note.creationDate = moment().valueOf();
    note.modificationDate = 0;
    return this.notes.add(note);
  }

  async updateNote(note: Note) {
    note.modificationDate = moment().valueOf();
    await this.notes.update(note.id, note);
  }

  async getNoteById(id: string): Promise<Note | null> {
    const foundNote = await this.notes.where('id').equals(id).first();
    return foundNote || null;
  }

  async getThemeById(id: string): Promise<Theme | null> {
    const foundTheme = await this.themes.where('id').equals(id).first();
    return foundTheme || null;
  }

  async deleteNoteById(id: string) {
    try {
      await this.notes.delete(id);
    } catch (error) {
      throw new Error('Error deleting note');
    }
  }
}
