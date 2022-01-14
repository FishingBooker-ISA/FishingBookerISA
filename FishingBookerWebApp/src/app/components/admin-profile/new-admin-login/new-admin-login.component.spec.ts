import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdminLoginComponent } from './new-admin-login.component';

describe('NewAdminLoginComponent', () => {
  let component: NewAdminLoginComponent;
  let fixture: ComponentFixture<NewAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
