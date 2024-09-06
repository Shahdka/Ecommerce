import { TestBed } from '@angular/core/testing';

import { CheckorderService } from './checkorder.service';

describe('CheckorderService', () => {
  let service: CheckorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
