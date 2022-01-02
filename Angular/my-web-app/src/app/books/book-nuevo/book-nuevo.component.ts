import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
  styleUrls: ['./book-nuevo.component.css'],
})
export class BookNuevoComponent implements OnInit {

  selectAutor:string | undefined;

  constructor() {}

  ngOnInit(): void {}

  guardarLibro(form:NgForm) {}
}
