import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateOwnerNavbarComponent } from './estate-owner-navbar.component';

describe('EstateOwnerNavbarComponent', () => {
  let component: EstateOwnerNavbarComponent;
  let fixture: ComponentFixture<EstateOwnerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateOwnerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateOwnerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
