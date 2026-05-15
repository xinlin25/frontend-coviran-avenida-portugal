import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito/carrito.service';
import { Carrito as CarritoModel } from '../../models/carrito';
import { CarritoItemCard } from '../../shared/carrito-item-card/carrito-item-card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';

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
  procesandoCompra: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      metodoPago: ['EFECTIVO'],
      especificacionesEntrega: [''],
    });
    this.cargarCarrito();
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
    const datos = this.checkoutForm.value;

    if (datos.metodoPago === 'EFECTIVO') {
      this.procesandoCompra = true;
      this.carritoService.confirmarPedido(datos).subscribe({
        next: (pedido) => {
          console.log(pedido);
          this.toast.success('Compra realizada exitosamente');
          this.carrito = {
            id: 0,
            items: [],
          };
          this.procesandoCompra = false;
        },

        error: (err) => {
          this.toast.error('Error al confirmar el pedido');
          this.procesandoCompra = false;
        },
      });
    }
  }
}
