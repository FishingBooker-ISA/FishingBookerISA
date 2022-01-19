import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOwnerNavbarComponent } from './ship-owner-navbar.component';

describe('ShipOwnerNavbarComponent', () => {
  let component: ShipOwnerNavbarComponent;
  let fixture: ComponentFixture<ShipOwnerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOwnerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOwnerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
