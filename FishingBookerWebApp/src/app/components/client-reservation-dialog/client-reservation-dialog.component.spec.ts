import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReservationDialogComponent } from './client-reservation-dialog.component';

describe('ClientReservationDialogComponent', () => {
  let component: ClientReservationDialogComponent;
  let fixture: ComponentFixture<ClientReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReservationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
