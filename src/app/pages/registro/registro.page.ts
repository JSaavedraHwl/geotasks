import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  private autenticacionService = inject(AutenticacionService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  constructor() {}

  isFormValid(): boolean {
    return !!this.email && !!this.password;
  }

  handleRegisterSuccess() {
    this.router.navigate(['/tabs']);
  }

  handleRegisterError(error: any) {
    console.error('Error en el registro:', error);
    alert('Error en el registro. Por favor, intenta de nuevo.');
  }

  register() {
    if (this.isFormValid()) {
      this.autenticacionService.register(this.email, this.password).subscribe({
        next: () => this.handleRegisterSuccess(),
        error: (error) => this.handleRegisterError(error),
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/autenticacion']);
  }
}
