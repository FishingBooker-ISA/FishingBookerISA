import { TestBed } from '@angular/core/testing';

import { ManagingShipsServiceService } from './managing-ships-service.service';

describe('ManagingShipsServiceService', () => {
  let service: ManagingShipsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingShipsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
