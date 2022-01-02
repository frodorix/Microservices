import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo/book-nuevo.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort)
  ordenamiento!: MatSort;
  @ViewChild(MatPaginator) paginacion!: MatPaginator;
  private bookSuscription!: Subscription;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}
  ngOnDestroy(): void {
    this.bookSuscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.obtenerLibros();
    this.bookSuscription = this.booksService.booksSubject.subscribe(() => {
     // console.log(this.booksService.obtenerLibros());
      this.dataSource.data = this.booksService.obtenerLibros();
    });
  }

  filtrar(filtro: any) {
    this.dataSource.filter = filtro.value;
  }

  abrirDialogo() {
    this.dialog.open(BookNuevoComponent, {
      width: '350px',
    });
  }
}
