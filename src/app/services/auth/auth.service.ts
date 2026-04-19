import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Lo que le vamos a enviar al backend
interface LoginRequest {
  correo: string;
  password: string;
}

//Lo que esperamos recibir del backend
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Conecta con @RequestMapping("/auth")
  private apiURL = 'https://backend-coviran.onrender.com/auth';
  //Para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.apiURL}/register`, data);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    const payload = this.getTokenPayload();

    if (!payload) return false;

    const ahora = Math.floor(Date.now() / 1000);

    if (payload.exp < ahora) {
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getMiPerfil() {
    return this.http.get<UsuarioPerfil>('https://backend-coviran.onrender.com/usuarios/mi-perfil');
  }

  actualizarPerfil(data: any) {
    return this.http.put('https://backend-coviran.onrender.com/usuarios/mi-perfil', data);
  }

  private getTokenPayload(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getRol(): string | null {
    const payload = this.getTokenPayload();
    return payload?.rol || null;
  }
}
