import { TestBed } from '@angular/core/testing';

import { IndexedDbService } from './indexed-db-service.service';

describe('IndexDbServiceService', () => {
  let service: IndexedDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
