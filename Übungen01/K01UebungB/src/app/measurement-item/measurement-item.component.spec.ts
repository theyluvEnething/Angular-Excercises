import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementItemComponent } from './measurement-item.component';

describe('MeasurementItemComponent', () => {
  let component: MeasurementItemComponent;
  let fixture: ComponentFixture<MeasurementItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementItemComponent]
    });
    fixture = TestBed.createComponent(MeasurementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
