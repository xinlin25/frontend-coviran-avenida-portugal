import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tarjeta.html',
  styleUrls: ['./tarjeta.css'],
})
export class TarjetaComponent {
  @Input() id!: number;
  @Input() titulo: string = 'Título por defecto';
  @Input() descripcion: string = 'Descripción por defecto';
  @Input() imagen?: string | string[];
  @Input() precio: number = 0.0;
  @Input() unidad: string = 'ud';
  @Input() precioOriginal?: number;
  @Input() enOferta: boolean = false;
  @Output() agregar = new EventEmitter<number>();

  get imagenPrincipal(): string {
    if (Array.isArray(this.imagen)) return this.imagen[0] || '/img/img-placeholder.jpg';
    return this.imagen || '/img/img-placeholder.jpg';
  }

  manejarClick(event: MouseEvent) {
    event.stopPropagation();
    this.agregar.emit(this.id);
  }
}
