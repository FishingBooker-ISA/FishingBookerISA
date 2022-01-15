import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoActionsComponent } from './promo-actions.component';

describe('PromoActionsComponent', () => {
  let component: PromoActionsComponent;
  let fixture: ComponentFixture<PromoActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
