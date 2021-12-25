import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private libros = ['Aritmetica 4', 'Calculo II ', 'Fisica'];

  constructor() {}

  obtenerLibros() {
    return [...this.libros];
  }

  agregarLibro(libroNombre: string) {
    this.libros.push(libroNombre);
  }
}
