import { Component, OnInit } from '@angular/core';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  libros : any;

  constructor(private librosService: LibroService) {
    this.libros = librosService.obtenerLibros();
  }

  ngOnInit(): void {}

  eliminarLibro(libro: any) {
    // this.libros = this.libros.filter((p) => p !== libro);
  }

  guardarLibro(f: any) {
    if (f.valid) {
      //this.libros.push(f.value.nombreLibro);
    }
  }
}
