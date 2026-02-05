import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, TarjetaComponent, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  agregarProducto() {}
}
