import { TestBed } from '@angular/core/testing';

import { PciSeverityService } from './pci-severity.service';

describe('PciSeverityService', () => {
  let service: PciSeverityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PciSeverityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
