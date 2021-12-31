import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { SeguridadService } from 'src/app/security/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter();
  estadoUsuario: boolean | undefined;
  usuarioSubscription: Subscription | undefined;

  constructor(private seguridadServicio: SeguridadService) {}

  ngOnDestroy(): void {
    this.usuarioSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServicio.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }


  terminarSesion(){
    this.seguridadServicio.cerrarSession();
  }
}
