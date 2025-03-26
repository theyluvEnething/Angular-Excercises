import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDetailComponent } from './notes-detail.component';

describe('NotesDetailComponent', () => {
  let component: NotesDetailComponent;
  let fixture: ComponentFixture<NotesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesDetailComponent]
    });
    fixture = TestBed.createComponent(NotesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
