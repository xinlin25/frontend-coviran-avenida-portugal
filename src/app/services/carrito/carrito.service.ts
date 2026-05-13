import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = 'https://backend-coviran.onrender.com/carrito';

  constructor(private http: HttpClient) {}

  agregarProducto(productoId: number, cantidad: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, {
      productoId,
      cantidad,
    });
  }

  obtenerCarrito(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  confirmarPedido(): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmar`, {});
  }
}
