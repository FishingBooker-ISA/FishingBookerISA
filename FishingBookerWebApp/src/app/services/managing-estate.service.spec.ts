import { TestBed } from '@angular/core/testing';

import { ManagingEstateService } from './managing-estate.service';

describe('ManagingEstateService', () => {
  let service: ManagingEstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingEstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
