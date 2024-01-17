import { TestBed } from '@angular/core/testing';

import { RoadNetworkInventoryService } from './road-network-inventory.service';

describe('RoadNetworkInventoryService', () => {
  let service: RoadNetworkInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadNetworkInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
