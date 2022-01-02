import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();

  constructor(private httpClient: HttpClient) {}

  obtenerAutores() {
    this.httpClient.get<Autor[]>(this.baseUrl  + 'api/LibreriaServicio/autores')
    .subscribe((data) =>{
      this.autoresLista = data;
      this.autoresSubject.next([...this.autoresLista]);
    });
  }

  obtenerActualizarListener(){
    return this.autoresSubject.asObservable();
  }
}
