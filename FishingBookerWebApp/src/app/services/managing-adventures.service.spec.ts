import { TestBed } from '@angular/core/testing';

import { ManagingAdventuresService } from './managing-adventures.service';

describe('ManagingAdventuresService', () => {
  let service: ManagingAdventuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingAdventuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
