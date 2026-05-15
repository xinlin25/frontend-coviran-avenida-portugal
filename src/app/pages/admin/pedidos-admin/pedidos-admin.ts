import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedidos/pedidos.service';
import { Pedido } from '../../../models/pedido';
import { ToastService } from '../../../services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos-admin.html',
  styleUrl: './pedidos-admin.css',
})
export class PedidosAdmin implements OnInit {
  pedidos: Pedido[] = [];
  busqueda: string = '';
  private busquedaSubject: Subject<string> = new Subject();
  pedidoSeleccionado: Pedido | null = null;

  constructor(
    private pedidoService: PedidoService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.busquedaSubject.pipe(debounceTime(500)).subscribe((texto) => {
      this.buscar(texto);
    });
  }

  cargarPedidos() {
    this.pedidoService.obtenerTodosPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },

      error: (err) => {
        this.toast.error('Error al cargar los pedidos');
      },
    });
  }

  buscar(texto: string) {
    if (!texto || texto.trim() === '') {
      this.cargarPedidos();
      return;
    }

    this.pedidoService.buscarPedidos(texto).subscribe({
      next: (data) => {
        this.pedidos = data;
      },

      error: () => {
        this.toast.error('Error al buscar pedidos');
      },
    });
  }

  onBuscarChange() {
    this.busquedaSubject.next(this.busqueda);
  }

  abrirModal(pedido: Pedido) {
    this.pedidoSeleccionado = pedido;
  }

  guardarEstado() {
    if (!this.pedidoSeleccionado) return;

    this.pedidoService
      .cambiarEstado(
        this.pedidoSeleccionado.id,

        this.pedidoSeleccionado.estado,
      )
      .subscribe({
        next: () => {
          this.toast.success('Estado actualizado');
          this.cargarPedidos();
        },

        error: () => {
          this.toast.error('Error al actualizar estado');
        },
      });
  }
}
