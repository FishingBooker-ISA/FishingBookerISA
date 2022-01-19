import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationShipsComponent } from './create-reservation-ships.component';

describe('CreateReservationShipsComponent', () => {
  let component: CreateReservationShipsComponent;
  let fixture: ComponentFixture<CreateReservationShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReservationShipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
