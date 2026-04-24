export interface Usuario {
  id: number;
  nombreCompleto: string;
  correo: string;
  password?: string; // Solo se usará para crear un nuevo usuario
  tlf: string;
  direccion: string;
  rol: string;
  enabled: boolean;
}
