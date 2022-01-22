import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureClientProfileComponent } from './adventure-client-profile.component';

describe('AdventureClientProfileComponent', () => {
  let component: AdventureClientProfileComponent;
  let fixture: ComponentFixture<AdventureClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureClientProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
