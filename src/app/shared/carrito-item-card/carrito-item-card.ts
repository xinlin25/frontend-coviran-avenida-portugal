import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoItem } from '../../models/carrito-item';

@Component({
  selector: 'app-carrito-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-item-card.html',
  styleUrl: './carrito-item-card.css',
})
export class CarritoItemCard {
  @Input()
  item!: CarritoItem;

  @Output()
  sumar = new EventEmitter<number>();

  @Output()
  restar = new EventEmitter<number>();

  @Output()
  eliminar = new EventEmitter<number>();

  sumarCantidad() {
    this.sumar.emit(this.item.id);
  }

  restarCantidad() {
    this.restar.emit(this.item.id);
  }

  eliminarItem() {
    this.eliminar.emit(this.item.id);
  }
}
