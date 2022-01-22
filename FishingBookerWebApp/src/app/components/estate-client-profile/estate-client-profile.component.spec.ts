import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateClientProfileComponent } from './estate-client-profile.component';

describe('EstateClientProfileComponent', () => {
  let component: EstateClientProfileComponent;
  let fixture: ComponentFixture<EstateClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateClientProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
