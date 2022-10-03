import { TestBed } from '@angular/core/testing';

import { EcomInterceptorInterceptor } from './ecom-interceptor.interceptor';

describe('EcomInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EcomInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EcomInterceptorInterceptor = TestBed.inject(EcomInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
