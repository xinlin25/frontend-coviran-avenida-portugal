import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../models/pedido';

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

  constructor(private pedidoService: PedidoService) {}

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

        this.cargando = false;
      },
    });
  }
}
