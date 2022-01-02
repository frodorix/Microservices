import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort)
  ordenamiento!: MatSort;

  constructor(private booksService: BooksService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
  }

  ngOnInit(): void {
    console.log(this.dataSource);
    this.dataSource.data = this.booksService.obtenerLibros();
  }
}
