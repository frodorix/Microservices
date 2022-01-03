import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Books } from './books.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './book-nuevo/pagination-books.model';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.baseUrl;
  booksSubject = new Subject();

  bookPagination!: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  private booksList: Books[] = [];

  constructor(private httpClient: HttpClient) {}

  obtenerLibros(
    librosPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ) {
    const request = {
      pageSize: librosPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue,
    };
    this.httpClient
      .post<PaginationBooks>(this.baseUrl + 'api/libro/pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }
  obtenerActualLinstener() {
    return this.bookPaginationSubject.asObservable();
  }
  guardarLibro(book: Books) {
    this.httpClient
      .post(this.baseUrl + 'api/Libro', book)
      .subscribe((response) => {
        this.booksSubject.next(null);
      });
  }

  eliminarLibro(libroNombre: string) {
    // this.libros = this.libros.filter((x) => x !== libroNombre);
    // this.librosSubject.next(this.libros);
  }
}
