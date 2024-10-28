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
      this.autenticacionService.login(this.email, this.password)
      .subscribe();
    } else {
      console.log('Por favor, completa los campos de correo electrónico y contraseña.');
    }
  }

  loginAsGuest() {
    this.autenticacionService.authenticateAsGuest();
  }

  navigateToRegister() {
    this.router.navigate(['/registro']);
  }

  resetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
