import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOwnerHomepageComponent } from './ship-owner-homepage.component';

describe('ShipOwnerHomepageComponent', () => {
  let component: ShipOwnerHomepageComponent;
  let fixture: ComponentFixture<ShipOwnerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipOwnerHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOwnerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
