import { Injectable } from '@angular/core';
import { LoginData } from './login-data-model';
import { Usuario } from './usuario.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario|null =null;

  constructor() {}

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

  }
  cerrarSession() {
    this.usuario = null;
    this.seguridadCambio.next(false);

  }
  obtenerUsuario() {
    return { ...this.usuario };
  }
}
