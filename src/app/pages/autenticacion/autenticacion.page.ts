import { Component, inject, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  autenticacionService = inject(AutenticacionService);
  router = inject(Router);

  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() { }

  login() {
    if (this.email && this.password) {
      // Aquí puedes implementar la lógica para validar el email y contraseña con tu backend
      console.log('Iniciando sesión con:', this.email);
      this.autenticacionService.authenticate();
    } else {
      console.log('Por favor, completa los campos de correo electrónico y contraseña.');
    }
  }

  loginAsGuest() {
    console.log('Iniciando sesión como invitado');
    this.autenticacionService.authenticateAsGuest();
  }

  navigateToRegister() {
    // Navegar a la página de registro
    this.router.navigate(['/registro']);
  }

  resetPassword() {
    // Implementar la lógica para restablecer la contraseña
    console.log('Redirigiendo a la página de restablecimiento de contraseña');
    this.router.navigate(['/reset-password']);
  }
}
