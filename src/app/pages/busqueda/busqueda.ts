import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/productos/productos.service';
import { Producto } from '../../models/producto';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements OnInit {
  productos: Producto[] = [];
  query: string = '';
  paginaActual = 1;
  elementosPorPagina = 12;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private authService: Auth,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';

      if (this.query.trim()) {
        this.productoService.buscarProductos(this.query).subscribe((data) => {
          this.productos = data;
          this.paginaActual = 1;
        });
      }
    });
  }

  get productosPaginados(): Producto[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    return this.productos.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.elementosPorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  agregarAlCarrito(id: number) {
    if (this.authService.esAdminOEmpleado()) {
      this.toast.error('No puedes añadir productos al carrito siendo admin o empleado');
      return;
    }

    console.log('Agregar producto', id);
  }
}
