import { TestBed } from '@angular/core/testing';

import { EcomServiceService } from './ecom-service.service';

describe('EcomServiceService', () => {
  let service: EcomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
