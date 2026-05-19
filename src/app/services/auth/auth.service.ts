import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';

//Lo que le vamos a enviar al backend
interface LoginRequest {
  correo: string;
  password: string;
}

//Lo que esperamos recibir del backend
interface LoginResponse {
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Conecta con @RequestMapping("/auth")
  private apiURL = 'https://backend-coviran.onrender.com/auth';
  private refreshTokenRequest?: Observable<LoginResponse>;
  //Para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/login`, data);
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/refresh-token`, {
      refreshToken: this.obtenerRefreshToken(),
    });
  }

  refrescarSesion(): Observable<LoginResponse> {
    if (!this.refreshTokenRequest) {
      this.refreshTokenRequest = this.refreshToken().pipe(
        tap((response) => this.guardarSesion(response)),
        finalize(() => (this.refreshTokenRequest = undefined)),
        shareReplay(1),
      );
    }

    return this.refreshTokenRequest;
  }

  register(data: any) {
    return this.http.post(`${this.apiURL}/register`, data);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  guardarRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  guardarSesion(response: LoginResponse) {
    this.guardarToken(response.token);
    this.guardarRefreshToken(response.refreshToken);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  estaAutenticado(): boolean {
    const payload = this.getTokenPayload();

    if (!payload) return !!this.obtenerRefreshToken();

    const ahora = Math.floor(Date.now() / 1000);

    if (payload.exp < ahora) {
      return !!this.obtenerRefreshToken();
    }

    return true;
  }

  logout() {
    const refreshToken = this.obtenerRefreshToken();

    if (refreshToken) {
      this.http.post(`${this.apiURL}/logout`, { refreshToken }).subscribe();
    }

    this.limpiarSesion();
  }

  limpiarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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

  esAdminOEmpleado(): boolean {
    const rol = this.getRol();
    return rol === 'ADMIN' || rol === 'EMPLEADO';
  }

  recuperarPassword(correo: string) {
    return this.http.post(
      `${this.apiURL}/recuperar-password`,
      { correo },
      { responseType: 'text' },
    );
  }
  restablecerPassword(data: { token: string; password: string }) {
    return this.http.post(`${this.apiURL}/restablecer-password`, data, { responseType: 'text' });
  }
}
