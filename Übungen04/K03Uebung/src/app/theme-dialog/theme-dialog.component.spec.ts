import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDialogComponent } from './theme-dialog.component';

describe('ThemeDialogComponent', () => {
  let component: ThemeDialogComponent;
  let fixture: ComponentFixture<ThemeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeDialogComponent]
    });
    fixture = TestBed.createComponent(ThemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
