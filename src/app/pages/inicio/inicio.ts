import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { RouterLink } from '@angular/router';

import { CategoriasService } from '../../services/categorias/categorias.service';
import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, TarjetaComponent, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  categorias: Categoria[] = [];
  ofertas: Producto[] = [];
  destacados: Producto[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarOfertas();
    this.cargarDestacados();
  }

  cargarCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data
          .filter((categoria) => categoria.parent == null && categoria.activo)
          .slice(0, 6);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  cargarOfertas() {
    this.productoService.getOfertas().subscribe({
      next: (data) => {
        this.ofertas = data.slice(0, 8);
      },
      error: (err) => console.error(err),
    });
  }

  cargarDestacados() {
    this.productoService.getDestacados().subscribe({
      next: (data) => {
        this.destacados = data.slice(0, 8);
      },
      error: (err) => console.error(err),
    });
  }

  getImagenCategoria(nombre: string): string {
    const imagenes: { [key: string]: string } = {
      Congelados: '/img/inicio/congelados.png',
      'Fruta y Verdura': '/img/inicio/fruta-verdura.png',
      Panadería: '/img/inicio/panaderia.png',
      Limpieza: '/img/inicio/limpieza.png',
      Bebidas: '/img/inicio/bebidas.png',
      Alimentación: '/img/inicio/alimentacion.png',
      Higiene: '/img/inicio/higiene.png',
    };

    return imagenes[nombre] || '/img/inicio/default.png';
  }

  agregarProducto() {}
}
