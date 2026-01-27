import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  agregarProducto() {}
}
