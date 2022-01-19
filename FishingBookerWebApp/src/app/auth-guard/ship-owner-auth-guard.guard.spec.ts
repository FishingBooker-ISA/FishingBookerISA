import { TestBed } from '@angular/core/testing';

import { ShipOwnerAuthGuardGuard } from './ship-owner-auth-guard.guard';

describe('ShipOwnerAuthGuardGuard', () => {
  let guard: ShipOwnerAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShipOwnerAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
