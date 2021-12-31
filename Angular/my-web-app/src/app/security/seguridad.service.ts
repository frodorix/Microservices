import { Injectable } from '@angular/core';
import { LoginData } from './login-data-model';
import { Usuario } from './usuario.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario|null =null;

  constructor(private router:Router) {}

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 1999).toString(),
      apellidos: usr.apellidos,
      nombre: usr.nombre,
      username: usr.username,
      password:usr.password
    };
    this.seguridadCambio.next(true);

    //route to home when register successfully
    this.router.navigate(['/']);
  }
  login(usr: LoginData) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 1999).toString(),
      apellidos: '',
      nombre: '',
      username: '',
      password:''
    };
    this.seguridadCambio.next(true);

    //route to home when login successfully
    this.router.navigate(['/']);
  }
  cerrarSession() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    //route to login when logout successfully
    this.router.navigate(['/login']);

  }
  obtenerUsuario() {
    return { ...this.usuario };
  }
}
