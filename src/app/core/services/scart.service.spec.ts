import { TestBed } from '@angular/core/testing';

import { SCartService } from './scart.service';

describe('SCartService', () => {
  let service: SCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
