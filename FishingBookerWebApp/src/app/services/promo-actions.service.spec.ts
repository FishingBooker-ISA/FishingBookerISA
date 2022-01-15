import { TestBed } from '@angular/core/testing';

import { PromoActionsService } from './promo-actions.service';

describe('PromoActionsService', () => {
  let service: PromoActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
