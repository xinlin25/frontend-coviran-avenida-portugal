import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pedido } from '../../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://backend-coviran.onrender.com/pedidos';

  constructor(private http: HttpClient) {}

  obtenerMisPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mis-pedidos`);
  }

  obtenerTodosPedidos() {
    return this.http.get<Pedido[]>(`${this.apiUrl}`);
  }

  buscarPedidos(texto: string) {
    return this.http.get<Pedido[]>(`${this.apiUrl}/buscar?texto=${texto}`);
  }

  cambiarEstado(id: number, estado: string) {
    return this.http.put(`${this.apiUrl}/${id}/estado?estado=${estado}`, {});
  }

  cancelarPedido(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {});
  }
}
