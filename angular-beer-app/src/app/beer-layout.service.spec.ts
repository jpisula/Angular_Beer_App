import { TestBed } from '@angular/core/testing';

import { BeerLayoutService } from './beer-layout.service';

describe('BeerLayoutService', () => {
  let service: BeerLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
