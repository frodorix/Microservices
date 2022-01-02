import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
  styleUrls: ['./book-nuevo.component.css'],
})
export class BookNuevoComponent implements OnInit {
  selectAutor: string | undefined;
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  constructor() {}

  ngOnInit(): void {}

  guardarLibro(form: NgForm) {}
}
