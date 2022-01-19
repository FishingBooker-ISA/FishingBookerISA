import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNavigationToolsComponent } from './add-navigation-tools.component';

describe('AddNavigationToolsComponent', () => {
  let component: AddNavigationToolsComponent;
  let fixture: ComponentFixture<AddNavigationToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNavigationToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNavigationToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
