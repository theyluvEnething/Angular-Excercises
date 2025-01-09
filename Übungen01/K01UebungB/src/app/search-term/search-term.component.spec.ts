import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTermComponent } from './search-term.component';

describe('SearchTermComponent', () => {
  let component: SearchTermComponent;
  let fixture: ComponentFixture<SearchTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTermComponent]
    });
    fixture = TestBed.createComponent(SearchTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
