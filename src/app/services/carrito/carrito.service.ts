import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Carrito } from '../../models/carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = 'https://backend-coviran.onrender.com/carrito';

  constructor(private http: HttpClient) {}

  agregarProducto(productoId: number, cantidad: number = 1): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.apiUrl}/agregar`, {
      productoId,
      cantidad,
    });
  }

  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(this.apiUrl);
  }

  confirmarPedido(data: any) {
    return this.http.post(`${this.apiUrl}/confirmar`, data);
  }

  sumarCantidadItem(itemId: number): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.apiUrl}/item/${itemId}/sumar`, {});
  }

  restarCantidadItem(itemId: number): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.apiUrl}/item/${itemId}/restar`, {});
  }

  eliminarItem(itemId: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.apiUrl}/item/${itemId}`);
  }

  checkoutStripe(datos: any) {
    return this.http.post(`${this.apiUrl}/checkout`, datos, { responseType: 'text' });
  }
}
