import { TestBed } from '@angular/core/testing';

import { RegistratiService } from './registrati.service';

describe('RegistratiService', () => {
  let service: RegistratiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistratiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
