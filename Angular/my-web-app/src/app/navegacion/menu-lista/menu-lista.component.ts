import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/security/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css'],
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter();
  estadoUsuario: boolean | undefined;
  usuarioSuscription: Subscription | undefined;

  constructor(private seguridadService: SeguridadService) {}

  ngOnDestroy(): void {
    this.usuarioSuscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioSuscription = this.seguridadService.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
  }

  onCloseMenu() {
    this.menuToggle.emit();
  }

  terminarSessionMenu() {
    this.onCloseMenu();
    this.seguridadService.cerrarSession();
  }
}
