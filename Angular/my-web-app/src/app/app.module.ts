import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrosComponent } from './libros/libros.component';
import { LibroComponent } from './libro/libro.component';
import { FormsModule } from '@angular/forms';
import { LibroService } from './services/libro.service';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    LibroComponent,
    InicioComponent,
    RegisterComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule

  ],
  providers: [
    LibroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
