import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

    libros = ["librep1", "libro2 ", "libreo 3"];
  constructor() { }

  ngOnInit(): void {
  }

}
