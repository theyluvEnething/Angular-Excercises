import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteManagamentComponent } from './note-managament.component';

describe('NoteManagamentComponent', () => {
  let component: NoteManagamentComponent;
  let fixture: ComponentFixture<NoteManagamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteManagamentComponent]
    });
    fixture = TestBed.createComponent(NoteManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
