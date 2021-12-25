import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit, OnDestroy {
  libros: string[] = [];
  private libroSubscription!: Subscription;
  constructor(private librosService: LibroService) {}

  ngOnInit(): void {
    this.libros = this.librosService.obtenerLibros();
    //subscribe to changes
    this.librosService.librosSubject.subscribe((data: any) => {
      this.libros = data;
    });
  }

  ngOnDestroy(): void {
    this.libroSubscription.unsubscribe();
  }

  eliminarLibro(libro: any) {
    // this.libros = this.libros.filter((p) => p !== libro);
  }

  guardarLibro(f: any) {
    if (f.valid) {
      this.librosService.agregarLibro(f.value.nombreLibro);
    }
  }
}
