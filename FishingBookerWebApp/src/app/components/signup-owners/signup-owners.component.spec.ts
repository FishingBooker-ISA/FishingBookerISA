import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOwnersComponent } from './signup-owners.component';

describe('SignupOwnersComponent', () => {
  let component: SignupOwnersComponent;
  let fixture: ComponentFixture<SignupOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOwnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
