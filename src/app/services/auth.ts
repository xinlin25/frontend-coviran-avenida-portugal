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
  private apiURL = "http://localhost:8080/auth";
  //Para hacer peticiones HTTP
  constructor(private http:HttpClient) {}

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

  logout() {
    localStorage.removeItem('token');
  }
}