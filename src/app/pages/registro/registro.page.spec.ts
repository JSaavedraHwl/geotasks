import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { of, throwError } from 'rxjs';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let autenticacionServiceSpy: jasmine.SpyObj<AutenticacionService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    autenticacionServiceSpy = jasmine.createSpyObj('AutenticacionService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [
        { provide: AutenticacionService, useValue: autenticacionServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('isFormValid', () => {
    it('debería retornar true si email y password están completos', () => {
      component.email = 'test@example.com';
      component.password = 'password123';
      expect(component.isFormValid()).toBeTrue();
    });

    it('debería retornar false si email o password están vacíos', () => {
      component.email = '';
      component.password = 'password123';
      expect(component.isFormValid()).toBeFalse();

      component.email = 'test@example.com';
      component.password = '';
      expect(component.isFormValid()).toBeFalse();
    });
  });

  describe('register', () => {
    it('debería mostrar alerta si el formulario no es válido', () => {
      spyOn(window, 'alert');
      component.email = '';
      component.password = '';
      component.register();
      expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
    });

    it('debería llamar a register del servicio y navegar al éxito', () => {
      component.email = 'test@example.com';
      component.password = 'password123';
      autenticacionServiceSpy.register.and.returnValue(of({}));

      component.register();

      expect(autenticacionServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/tabs']);
    });

    it('debería manejar errores en el registro y mostrar alerta', () => {
      spyOn(window, 'alert');
      const errorResponse = { message: 'Error en el servidor' };
      component.email = 'test@example.com';
      component.password = 'password123';
      autenticacionServiceSpy.register.and.returnValue(throwError(errorResponse));

      component.register();

      expect(autenticacionServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Error en el registro. Por favor, intenta de nuevo.');
    });
  });

  describe('navigateToLogin', () => {
    it('debería navegar a /autenticacion', () => {
      component.navigateToLogin();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/autenticacion']);
    });
  });
});
