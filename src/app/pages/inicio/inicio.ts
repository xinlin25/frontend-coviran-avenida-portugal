import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { CarritoService } from '../../services/carrito/carrito.service';
import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/productos/productos.service';
import { Auth } from '../../services/auth/auth.service';

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
    private carritoService: CarritoService,
    private toast: ToastService,
    private authService: Auth,
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
        this.toast.error('Error al cargar las categorías');
      },
    });
  }

  cargarOfertas() {
    this.productoService.getOfertas().subscribe({
      next: (data) => {
        this.ofertas = data.slice(0, 8);
      },
      error: (err) => this.toast.error('Error al cargar las ofertas'),
    });
  }

  cargarDestacados() {
    this.productoService.getDestacados().subscribe({
      next: (data) => {
        this.destacados = data.slice(0, 8);
      },
      error: (err) => this.toast.error('Error al cargar los productos destacados'),
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

  agregarProducto(productoId: number) {
    if (this.authService.esAdminOEmpleado()) {
      this.toast.error('No puedes añadir productos al carrito siendo admin o empleado');
      return;
    }

    this.carritoService.agregarProducto(productoId).subscribe({
      next: () => {
        this.toast.success('Producto añadido al carrito');
      },

      error: (err) => {
        this.toast.error('Error al añadir el producto al carrito');
      },
    });
  }
}
