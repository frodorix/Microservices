import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { from, Subscription } from 'rxjs';
import { Autor } from 'src/app/autores/autor.model';
import { AutoresService } from 'src/app/autores/autores.service';
import { Books } from '../books.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
  styleUrls: ['./book-nuevo.component.css'],
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor: string = '';
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  selectAutorTexto: string = '';
  fechaPublicacion: string = '';

  autores: Autor[] = [];
  autorSubscripcion!: Subscription;

  constructor(
    private booksService: BooksService,
    private dialogRef: MatDialog,
    private autoresServices: AutoresService
  ) {}
  ngOnDestroy(): void {
    this.autorSubscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.autoresServices.obtenerAutores();
    this.autorSubscripcion = this.autoresServices
      .obtenerActualizarListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const autReq = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto,
        nombre:"",
        apellido:"",
        gradoAcademico:""
      };

      const bookReq: Books = {
        id: '',
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autReq,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion),
      };
      this.booksService.guardarLibro(bookReq);
      this.autorSubscripcion = this.booksService
        .obtenerActualLinstener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
}
