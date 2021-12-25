import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  libros = ['Matematica 1', 'Calculo II ', 'Fisica'];
  constructor() {}

  ngOnInit(): void {}

  eliminarLibro(libro: any) {
    this.libros = this.libros.filter((p) => p !== libro);
  }
}
