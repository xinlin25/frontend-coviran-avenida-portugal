import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiURL = 'https://backend-coviran.onrender.com/categorias';

  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<Categoria[]>(this.apiURL);
  }

  crearCategoria(data: any) {
    return this.http.post(this.apiURL, data);
  }

  actualizarCategoria(id: number, data: any) {
    return this.http.put(`${this.apiURL}/${id}`, data);
  }

  buscarCategorias(nombre: string) {
    return this.http.get<Categoria[]>(`${this.apiURL}/buscar/?nombre=${nombre}`);
  }

  borrarCategoria(nombre: string) {
    return this.http.delete(`${this.apiURL}/nombre/${nombre}`);
  }
}
