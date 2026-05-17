import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../models/pedido';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  pedidos: Pedido[] = [];
  cargando: boolean = true;

  pedidoSeleccionado: Pedido | null = null;

  constructor(
    private pedidoService: PedidoService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.obtenerMisPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },

      error: (err) => {
        console.error(err);
        this.toast.error('Error al cargar pedidos');
        this.cargando = false;
      },
    });
  }

  abrirModal(pedido: Pedido) {
    this.pedidoSeleccionado = pedido;
  }

  cancelarPedido() {
    if (!this.pedidoSeleccionado) return;

    this.pedidoService.cancelarPedido(this.pedidoSeleccionado.id).subscribe({
      next: () => {
        this.toast.success('Pedido cancelado');
        this.pedidoSeleccionado!.estado = 'CANCELADO';
        this.cargarPedidos();
      },

      error: () => {
        this.toast.error('No se pudo cancelar el pedido');
      },
    });
  }
}
