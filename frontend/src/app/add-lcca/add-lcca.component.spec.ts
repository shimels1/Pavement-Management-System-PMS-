import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLccaComponent } from './add-lcca.component';

describe('AddLccaComponent', () => {
  let component: AddLccaComponent;
  let fixture: ComponentFixture<AddLccaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLccaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLccaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
