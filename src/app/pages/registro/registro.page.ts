import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  private autenticacionService= inject(AutenticacionService);
  private router = inject(Router);
  email: string = '';
  password: string = '';

  constructor(
  ) {}

  register() {
    if (this.email && this.password) {
      this.autenticacionService.register(this.email, this.password).subscribe({
        next: (response) => {
          this.router.navigate(['/tabs']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          alert('Error en el registro. Por favor, intenta de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/autenticacion']);
  }
}