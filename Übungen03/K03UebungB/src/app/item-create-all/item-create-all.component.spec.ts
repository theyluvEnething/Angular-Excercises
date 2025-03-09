import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreateAllComponent } from './item-create-all.component';

describe('ItemCreateAllComponent', () => {
  let component: ItemCreateAllComponent;
  let fixture: ComponentFixture<ItemCreateAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCreateAllComponent]
    });
    fixture = TestBed.createComponent(ItemCreateAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
