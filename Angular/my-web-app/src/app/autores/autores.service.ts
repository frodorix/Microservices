import { Injectable } from '@angular/core';
import { Autor } from './autor.model';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  private autoresLista: Autor[] = [
    {
      autorId: 1,
      nombre: 'Edwin',
      apellido: 'Rojas',
      gradoAcademico: 'Ingeniero Informatico',
    },
    {
      autorId: 2,
      nombre: 'Oscar',
      apellido: 'Rojas',
      gradoAcademico: 'Ingeniero Informatico',
    },
    {
      autorId: 3,
      nombre: 'Olga',
      apellido: 'Mendoza',
      gradoAcademico: 'Administrador',
    },
    {
      autorId: 4,
      nombre: 'David',
      apellido: 'Rojas',
      gradoAcademico: 'Ingeniero Informatico',
    },
  ];
  constructor() {}

  obtenerAutores() {
    return [...this.autoresLista];
  }
}
