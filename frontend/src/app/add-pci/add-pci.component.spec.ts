import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPciComponent } from './add-pci.component';

describe('AddPciComponent', () => {
  let component: AddPciComponent;
  let fixture: ComponentFixture<AddPciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
