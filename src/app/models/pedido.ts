import { DetallePedido } from './detalle-pedido';

export interface Pedido {
  id: number;
  total: number;
  fecha: string;
  estado: string;
  metodoPago: string;
  especificacionesEntrega?: string;
  detalles: DetallePedido[];
}
