import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    console.log(this.dataSource);
    this.dataSource.data = this.booksService.obtenerLibros();
  }
}
