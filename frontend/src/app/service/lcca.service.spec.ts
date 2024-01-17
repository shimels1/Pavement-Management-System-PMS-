import { TestBed } from '@angular/core/testing';

import { LccaService } from './lcca.service';

describe('LccaService', () => {
  let service: LccaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LccaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
