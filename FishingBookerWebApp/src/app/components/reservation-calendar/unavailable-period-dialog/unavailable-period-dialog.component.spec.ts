import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailablePeriodDialogComponent } from './unavailable-period-dialog.component';

describe('UnavailablePeriodDialogComponent', () => {
  let component: UnavailablePeriodDialogComponent;
  let fixture: ComponentFixture<UnavailablePeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnavailablePeriodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailablePeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
