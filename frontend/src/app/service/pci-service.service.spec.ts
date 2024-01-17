import { TestBed } from '@angular/core/testing';

import { PciServiceService } from './pci-service.service';

describe('PciServiceService', () => {
  let service: PciServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PciServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
