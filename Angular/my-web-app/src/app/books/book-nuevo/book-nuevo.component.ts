import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { from } from 'rxjs';
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

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  guardarLibro(form: NgForm) {
    var b={
      libroId: 1,
      descripcion: form.value.descripcion,
      titulo: form.value.titulo,
      autor: this.selectAutorTexto,
      precio: form.value.precio,
      fechaPublicacion: new Date(this.fechaPublicacion),
    };
    console.log(b);

    this.booksService.guardarLibro(b);
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
}
