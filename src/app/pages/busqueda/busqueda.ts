import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/productos/productos.service';
import { Producto } from '../../models/producto';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';

      if (this.query.trim()) {
        this.productoService.buscarProductos(this.query).subscribe((data) => {
          this.productos = data;
        });
      }
    });
  }

  agregarAlCarrito(id: number) {
    console.log('Agregar producto', id);
  }
}
