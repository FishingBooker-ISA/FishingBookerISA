import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClientProfileComponent } from './boat-client-profile.component';

describe('BoatClientProfileComponent', () => {
  let component: BoatClientProfileComponent;
  let fixture: ComponentFixture<BoatClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatClientProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
