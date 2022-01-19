import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipProfileComponent } from './ship-profile.component';

describe('ShipProfileComponent', () => {
  let component: ShipProfileComponent;
  let fixture: ComponentFixture<ShipProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
