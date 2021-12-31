import { Injectable } from '@angular/core';
import { appendFile } from 'fs';
import { userInfo } from 'os';
import { LoginData } from './login-data-model';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private usuario: Usuario;

  constructor() {}

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 1999).toString(),
      apellidos: usr.apellidos,
      nombre: usr.nombre,
      username: usr.username,
    };
  }
  login(usr: LoginData) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 1999).toString(),
      apellidos: '',
      nombre: '',
      username: '',
    };
  }
  cerrarSession() {
    this.usuario = null;
  }
  obtenerUsuario() {
    return { ...this.usuario };
  }
}
