export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  marca: string;
  stock: number;
  activo: boolean;
  imagenUrl?: string;
  enOferta?: boolean;
  precioOferta?: number;
  categoriaId?: number | null;
  destacado?: boolean;

  categoria: {
    id: number;
    nombre: string;
  };
}
