import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLccaComponent } from './update-lcca.component';

describe('UpdateLccaComponent', () => {
  let component: UpdateLccaComponent;
  let fixture: ComponentFixture<UpdateLccaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLccaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLccaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
