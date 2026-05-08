import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiURL = 'https://backend-coviran.onrender.com/productos';

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<Producto[]>(this.apiURL);
  }

  buscarProductos(query: string) {
    return this.http.get<Producto[]>(`${this.apiURL}/buscar?query=${query}`);
  }

  crearProducto(data: any) {
    return this.http.post(this.apiURL, data);
  }

  actualizarProducto(id: number, data: any) {
    return this.http.put(`${this.apiURL}/${id}`, data);
  }

  getCategorias() {
    return this.http.get<any[]>('https://backend-coviran.onrender.com/categorias');
  }

  getProductosPorCategoria(id: number) {
    return this.http.get<Producto[]>(`${this.apiURL}/categoria/${id}`);
  }

  getOfertas() {
    return this.http.get<Producto[]>(`${this.apiURL}/ofertas`);
  }

  getDestacados() {
    return this.http.get<Producto[]>(`${this.apiURL}/destacados`);
  }
}
