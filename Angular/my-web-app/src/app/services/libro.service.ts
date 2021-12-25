import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {

  librosSubject  = new Subject();
  private libros = ['Aritmetica 4', 'Calculo II ', 'Fisica'];

  constructor() {}

  obtenerLibros() {
    return [...this.libros];
  }

  agregarLibro(libroNombre: string) {
    this.libros.push(libroNombre);
    this.librosSubject.next(this.libros);
  }

  eliminarLibro(libroNombre:string){
    this.libros = this.libros.filter(x=>  x !== libroNombre);
    this.librosSubject.next(this.libros);
  }

}
