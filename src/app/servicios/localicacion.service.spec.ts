import { TestBed } from '@angular/core/testing';

import { LocalicacionService } from './localicacion.service';

describe('LocalicacionService', () => {
  let service: LocalicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
