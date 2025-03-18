import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSortComponent } from './note-sort.component';

describe('NoteSortComponent', () => {
  let component: NoteSortComponent;
  let fixture: ComponentFixture<NoteSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteSortComponent]
    });
    fixture = TestBed.createComponent(NoteSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
