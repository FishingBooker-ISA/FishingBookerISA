import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAdventuresComponent } from './instructor-adventures.component';

describe('InstructorAdventuresComponent', () => {
  let component: InstructorAdventuresComponent;
  let fixture: ComponentFixture<InstructorAdventuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorAdventuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAdventuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
