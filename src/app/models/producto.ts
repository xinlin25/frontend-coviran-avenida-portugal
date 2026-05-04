export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  marca: string;
  stock: number;
  activo: boolean;

  categoria: {
    id: number;
    nombre: string;
  };
}
