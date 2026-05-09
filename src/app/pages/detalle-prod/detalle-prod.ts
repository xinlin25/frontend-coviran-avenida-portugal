import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { ProductoService } from '../../services/productos/productos.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-detalle-prod',
  imports: [CommonModule, TarjetaComponent, RouterLink],
  templateUrl: './detalle-prod.html',
  styleUrl: './detalle-prod.css',
})
export class DetalleProd implements OnInit {
  producto?: Producto;
  productosRelacionados: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.cargarProducto(id);
      this.cargarRelacionados(id, id);
    });
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;

        if (data.categoria?.id) {
          this.cargarRelacionados(data.categoria.id, data.id);
        }
      },
      error: (err) => console.error(err),
    });
  }

  agregarProducto() {
    console.log('Producto añadido');
  }

  cargarRelacionados(categoriaId: number, productoActualId: number) {
    this.productoService.getProductosPorCategoria(categoriaId).subscribe({
      next: (data) => {
        this.productosRelacionados = data.filter((p) => p.id !== productoActualId).slice(0, 4);
      },

      error: (err) => console.error(err),
    });
  }
}
