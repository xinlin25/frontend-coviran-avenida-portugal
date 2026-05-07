export interface Categoria {
  id: number;
  nombre: string;
  parent?: Categoria | null;
  hijos?: Categoria[];
  activo?: boolean;
}
