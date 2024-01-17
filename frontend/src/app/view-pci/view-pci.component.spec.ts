import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPciComponent } from './view-pci.component';

describe('ViewPciComponent', () => {
  let component: ViewPciComponent;
  let fixture: ComponentFixture<ViewPciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
