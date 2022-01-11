import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateReservationHistoryComponent } from './estate-reservation-history.component';

describe('EstateReservationHistoryComponent', () => {
  let component: EstateReservationHistoryComponent;
  let fixture: ComponentFixture<EstateReservationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateReservationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateReservationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
