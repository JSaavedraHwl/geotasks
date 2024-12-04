import { TestBed } from '@angular/core/testing';
import { LocalicacionService } from './localicacion.service';


describe('LocalicacionService', () => {
  let service: LocalicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalicacionService],
    });
    service = TestBed.inject(LocalicacionService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a location with numeric latitude and longitude', async () => {
    const location = await service.getCurrentLocation();
    expect(typeof location.latitude).toBe('number');
    expect(typeof location.longitude).toBe('number');
  });
});
