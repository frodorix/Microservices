import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, AfterViewInit {
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  @ViewChild(MatSort)
  ordenamiento!: MatSort;
  constructor(private autoresService: AutoresService) {}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
  }

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autoresService.obtenerActualizarListener()
    .subscribe((autores:Autor[])=>{
      this.dataSource.data=autores;
    });
    //this.dataSource.data = this.autoresService.obtenerAutores();
  }
}
