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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo/book-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './book-nuevo/pagination-books.model';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeout: any = null;

  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort)
  ordenamiento!: MatSort;
  @ViewChild(MatPaginator) paginacion!: MatPaginator;
  private bookSuscription!: Subscription;

  //paginacion
  totalLibros = 0;
  librosPorPagina = 2;
  paginaActual = 1;
  paginaCombo = [1, 2, 5, 10];
  sort = 'titulo';
  sortDirection = 'asc';
  filterValu :any= null;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}
  ngOnDestroy(): void {
    this.bookSuscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnInit(): void {
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sort,
      this.filterValu
    );
    this.booksService
      .obtenerActualLinstener()
      .subscribe((paginacion: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(paginacion.data);
        this.totalLibros = paginacion.totalRows;
      });
  }

  filtrar(event: any):void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };
        $this.filterValu = filterValueLocal;
        $this.booksService.obtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sort,
          filterValueLocal
        );
      }
    }, 1000);
  }

  abrirDialogo() {
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.booksService.obtenerLibros(
        this.librosPorPagina,
        this.paginaActual,
        this.sort,
        this.sort,
        this.filterValu
      );
    });
  }

  eventoPaginador(event: PageEvent) {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValu
    );
  }
  ordenarColumna(event: any) {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValu
    );
  }
}
