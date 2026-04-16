import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiURL = 'https://localhost:8443/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  cambiarRol(id: number, rol: string) {
    return this.http.put(`${this.apiURL}/${id}/rol`, { rol });
  }

  toggleActivo(id: number) {
    return this.http.put(`${this.apiURL}/${id}/toggle-activo`, {});
  }

  actualizarUsuario(id: number, data: Usuario) {
    return this.http.put(`${this.apiURL}/${id}`, {
      nombreCompleto: data.nombreCompleto,
      tlf: data.tlf,
      direccion: data.direccion,
      rol: data.rol,
      enabled: data.enabled,
    });
  }
}
