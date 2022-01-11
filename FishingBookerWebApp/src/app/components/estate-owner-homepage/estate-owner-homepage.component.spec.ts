import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateOwnerHomepageComponent } from './estate-owner-homepage.component';

describe('EstateOwnerHomepageComponent', () => {
  let component: EstateOwnerHomepageComponent;
  let fixture: ComponentFixture<EstateOwnerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateOwnerHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateOwnerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
