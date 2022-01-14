import { TestBed } from '@angular/core/testing';

import { ManagingImagesService } from './managing-images.service';

describe('ManagingImagesService', () => {
  let service: ManagingImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
