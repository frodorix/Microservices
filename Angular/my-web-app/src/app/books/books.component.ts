import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo/book-nuevo.component';

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
  @ViewChild(MatPaginator) paginacion!: MatPaginator;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.obtenerLibros();
  }

  filtrar(filtro: any) {
    this.dataSource.filter = filtro.value;
  }

  abrirDialogo() {
    this.dialog.open(BookNuevoComponent);
  }
}
