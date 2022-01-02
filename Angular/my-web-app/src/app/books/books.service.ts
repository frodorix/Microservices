import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Books } from './books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  booksSubject = new Subject();
  private booksList: Books[] = [
    {
      autor: 'EDWIN Rojas',
      descripcion: 'Calculo 1',
      fechaPublicacion: new Date(1981, 13, 19),
      libroId: 1,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Oscar Giovanni Rojas',
      descripcion: 'Calculo 2',
      fechaPublicacion: new Date(1979, 6, 27),
      libroId: 2,
      precio: 100,
      titulo: 'Introducción a calculo 1',
    },
    {
      autor: 'Olga Mendoza Antelo 2',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo2',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
    {
      autor: 'Olga Mendoza Antelo',
      descripcion: 'Calculo 3',
      fechaPublicacion: new Date(1976, 6, 8),
      libroId: 3,
      precio: 100,
      titulo: 'Introducción a calculo',
    },
  ];

  constructor() {}

  obtenerLibros() {
    return [...this.booksList];
  }

  guardarLibro(book: Books) {
    this.booksList.push(book);
    this.booksSubject.next(this.booksList);
  }

  eliminarLibro(libroNombre: string) {
    // this.libros = this.libros.filter((x) => x !== libroNombre);
    // this.librosSubject.next(this.libros);
  }
}
