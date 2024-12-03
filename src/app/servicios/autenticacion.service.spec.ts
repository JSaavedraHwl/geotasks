import { TestBed } from '@angular/core/testing';
import { AutenticacionService } from './autenticacion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

describe('AutenticacionService', () => {
  let service: AutenticacionService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        ModalController
      ]
    });

    service = TestBed.inject(AutenticacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should register a new user and update authentication state', () => {
    const mockResponse = { token: 'test-token' };
    service.register('test@example.com', 'password123').subscribe(response => {
      expect(response.token).toEqual(mockResponse.token);
      expect(service.isAuthenticated).toBeTrue();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle errors during registration', () => {
    service.register('test@example.com', 'password123').subscribe(
      () => fail('Expected an error'),
      error => {
        expect(error).toBeTruthy();
        expect(service.isAuthenticated).toBeFalse();
      }
    );

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    req.flush({ message: 'Error' }, { status: 400, statusText: 'Bad Request' });
  });
});
