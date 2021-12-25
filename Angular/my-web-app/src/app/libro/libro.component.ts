import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  @Input() tituloLibro!: string;
  @Output() libroClicked = new EventEmitter();

  constructor(private libroService: LibroService) {

  }

  ngOnInit(): void {}

  onClicked() {
   // this.libroClicked.emit();
   this.libroService.eliminarLibro(this.tituloLibro);
  }
}
