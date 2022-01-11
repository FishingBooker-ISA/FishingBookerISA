import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingInstructorsComponent } from './fishing-instructors.component';

describe('FishingInstructorsComponent', () => {
  let component: FishingInstructorsComponent;
  let fixture: ComponentFixture<FishingInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishingInstructorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
