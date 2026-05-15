import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito/carrito.service';
import { Carrito as CarritoModel } from '../../models/carrito';
import { CarritoItemCard } from '../../shared/carrito-item-card/carrito-item-card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CarritoItemCard, ReactiveFormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  carrito?: CarritoModel;
  cargando: boolean = true;
  checkoutForm!: FormGroup;

  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
    this.checkoutForm = this.fb.group({
      metodoPago: ['EFECTIVO'],

      especificacionesEntrega: [''],
    });
  }

  cargarCarrito() {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = data;
        this.cargando = false;
      },

      error: (err) => {
        console.error(err);
        this.cargando = false;
      },
    });
  }

  calcularTotal(): number {
    if (!this.carrito) return 0;

    return this.carrito.items.reduce(
      (total, item) => total + item.cantidad * item.precioUnitario,
      0,
    );
  }

  sumarCantidad(itemId: number) {
    this.carritoService.sumarCantidadItem(itemId).subscribe({
      next: (data) => {
        this.carrito = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  restarCantidad(itemId: number) {
    this.carritoService.restarCantidadItem(itemId).subscribe({
      next: (data) => {
        this.carrito = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  eliminarItem(itemId: number) {
    this.carritoService.eliminarItem(itemId).subscribe({
      next: (data) => {
        this.carrito = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  calcularEnvio(): number {
    return this.calcularTotal() >= 50 ? 0 : 2;
  }

  calcularTotalFinal(): number {
    return this.calcularTotal() + this.calcularEnvio();
  }

  finalizarCompra() {
    console.log(this.checkoutForm.value);
  }
}
