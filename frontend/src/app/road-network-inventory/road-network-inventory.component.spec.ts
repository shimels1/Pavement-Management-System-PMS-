import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadNetworkInventoryComponent } from './road-network-inventory.component';

describe('RoadNetworkInventoryComponent', () => {
  let component: RoadNetworkInventoryComponent;
  let fixture: ComponentFixture<RoadNetworkInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadNetworkInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadNetworkInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
