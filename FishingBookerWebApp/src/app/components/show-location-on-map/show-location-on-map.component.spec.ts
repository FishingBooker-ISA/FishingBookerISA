import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLocationOnMapComponent } from './show-location-on-map.component';

describe('ShowLocationOnMapComponent', () => {
  let component: ShowLocationOnMapComponent;
  let fixture: ComponentFixture<ShowLocationOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLocationOnMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLocationOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
