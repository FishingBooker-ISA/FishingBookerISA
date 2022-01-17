import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalServicesComponent } from './edit-additional-services.component';

describe('EditAdditionalServicesComponent', () => {
  let component: EditAdditionalServicesComponent;
  let fixture: ComponentFixture<EditAdditionalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdditionalServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdditionalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
