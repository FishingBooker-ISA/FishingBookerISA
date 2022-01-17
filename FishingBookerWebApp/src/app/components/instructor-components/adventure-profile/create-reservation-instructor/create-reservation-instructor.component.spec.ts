import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationInstructorComponent } from './create-reservation-instructor.component';

describe('CreateReservationInstructorComponent', () => {
  let component: CreateReservationInstructorComponent;
  let fixture: ComponentFixture<CreateReservationInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReservationInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
