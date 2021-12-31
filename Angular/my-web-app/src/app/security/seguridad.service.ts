import { Injectable } from '@angular/core';
import { LoginData } from './login-data-model';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
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
  }
  cerrarSession() {
    this.usuario = null;
  }
  obtenerUsuario() {
    return { ...this.usuario };
  }
}
