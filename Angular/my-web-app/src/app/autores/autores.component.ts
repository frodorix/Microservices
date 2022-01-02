import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, AfterViewInit, OnDestroy {
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  @ViewChild(MatSort)
  ordenamiento!: MatSort;
  private autorSusbscription!: Subscription;
  constructor(private autoresService: AutoresService) {}

  ngOnDestroy(): void {
    this.autorSusbscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
  }

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autorSusbscription = this.autoresService
      .obtenerActualizarListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
  }
}
