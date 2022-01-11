import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedUserNavbarComponent } from './unauthenticated-user-navbar.component';

describe('UnauthenticatedUserNavbarComponent', () => {
  let component: UnauthenticatedUserNavbarComponent;
  let fixture: ComponentFixture<UnauthenticatedUserNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedUserNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
