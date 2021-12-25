import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  @Input() tituloLibro!: string;
  @Output() libroClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClicked() {
    this.libroClicked.emit();
  }
}
