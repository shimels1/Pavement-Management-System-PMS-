import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCCAComponent } from './lcca.component';

describe('LCCAComponent', () => {
  let component: LCCAComponent;
  let fixture: ComponentFixture<LCCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCCAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
