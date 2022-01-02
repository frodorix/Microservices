import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { from } from 'rxjs';
import { Autor } from 'src/app/autores/autor.model';
import { AutoresService } from 'src/app/autores/autores.service';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
  styleUrls: ['./book-nuevo.component.css'],
})
export class BookNuevoComponent implements OnInit {
  selectAutor: string | undefined;
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  selectAutorTexto: string = '';
  fechaPublicacion: string = '';

  autores: Autor[] = [];

  constructor(
    private booksService: BooksService,
    private dialogRef: MatDialog,
    private autoresServices: AutoresService
  ) {}

  ngOnInit(): void {
    this.autores = this.autoresServices.obtenerAutores();
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      var b = {
        libroId: 1,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: this.selectAutorTexto,
        precio: form.value.precio,
        fechaPublicacion: new Date(this.fechaPublicacion),
      };
      this.booksService.guardarLibro(b);
      this.dialogRef.closeAll();
    }
  }
  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
}
