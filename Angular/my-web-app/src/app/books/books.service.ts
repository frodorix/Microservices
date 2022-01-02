import { Injectable } from '@angular/core';
import { Books } from './books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  // librosSubject  = new Subject();
  private libros: Books[] = [
    {
      autor: 'EDWIN Rojas',
      descripcion: 'Calculo 1',
    //  fechaPublicacion: new Date(1981, 13, 19),
      libroId: 1,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Oscar Giovanni Rojas',
      descripcion: 'Calculo 2',
     // fechaPublicacion: ""new Date(1979, 6, 27)"",
      libroId: 2,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
    //  fechaPublicacion: new Date(1976, 6, 08),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
  ];

  constructor() {}

  obtenerLibros() {
    return [...this.libros];
  }

  agregarLibro(libroNombre: string) {
    //this.libros.push(libroNombre);
    //  this.librosSubject.next(this.libros);
  }

  eliminarLibro(libroNombre: string) {
   // this.libros = this.libros.filter((x) => x !== libroNombre);
    // this.librosSubject.next(this.libros);
  }
}
