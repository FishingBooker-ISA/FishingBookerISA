import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNavigationToolsComponent } from './edit-navigation-tools.component';

describe('EditNavigationToolsComponent', () => {
  let component: EditNavigationToolsComponent;
  let fixture: ComponentFixture<EditNavigationToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNavigationToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNavigationToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
