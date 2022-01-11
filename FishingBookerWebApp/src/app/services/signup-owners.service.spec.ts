import { TestBed } from '@angular/core/testing';

import { SignupOwnersService } from './signup-owners.service';

describe('SignupOwnersService', () => {
  let service: SignupOwnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupOwnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
