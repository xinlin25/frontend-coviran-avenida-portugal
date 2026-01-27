import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.html',
  styleUrls: ['./tarjeta.css']
})
export class TarjetaComponent {
  @Input() titulo: string = 'Título por defecto';
  @Input() descripcion: string = 'Descripción por defecto';
  @Input() imagen?: string;
  @Input() precio: number = 0.00;
  @Input() unidad: string = 'ud';
  @Input() precioOriginal?: number;
  @Input() enOferta: boolean = false;
  @Output() agregar = new EventEmitter<void>();

  manejarClick() {
    this.agregar.emit();
  }
}
