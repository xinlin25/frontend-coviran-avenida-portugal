import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/productos/productos.service';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-productos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-admin.html',
  styleUrl: './productos-admin.css',
})
export class ProductosAdmin implements OnInit {
  productos: Producto[] = [];
  busqueda: string = '';
  productoSeleccionado: Producto | null = null;
  modoEdicion: boolean = false;
  productoEditando: any = null;
  categorias: any[] = [];

  private busquedaSubject = new Subject<string>();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
    this.busquedaSubject.pipe(debounceTime(500)).subscribe((texto) => {
      this.buscar(texto);
    });
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      },
      error: (err: any) => console.error(err),
    });
  }

  cargarCategorias() {
    this.productoService.getCategorias().subscribe({
      next: (data: any[]) => {
        this.categorias = data;
      },
      error: (err) => console.error(err),
    });
  }

  buscar(texto: string) {
    if (!texto || texto.trim() === '') {
      this.cargarProductos();
      return;
    }

    this.productoService.buscarProductos(texto).subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      },
      error: (err: any) => console.error(err),
    });
  }

  onBuscarChange() {
    this.busquedaSubject.next(this.busqueda);
  }

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.modoEdicion = false;

    this.productoEditando = {
      ...producto,
      categoriaId: producto.categoria?.id || null,
      activo: producto.activo !== undefined ? producto.activo : true,
    };
  }

  nuevoProducto() {
    this.modoEdicion = true;

    this.productoEditando = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      marca: '',
      stock: 0,
      categoriaId: null,
    };
  }

  cerrarModal() {
    this.productoEditando = null;
    this.productoSeleccionado = null;
    this.modoEdicion = false;
  }

  guardarCambios() {
    if (!this.productoEditando) return;

    if (this.productoEditando.id === 0) {
      const productoCrear = {
        nombre: this.productoEditando.nombre,
        descripcion: this.productoEditando.descripcion,
        precio: this.productoEditando.precio,
        marca: this.productoEditando.marca,
        stock: this.productoEditando.stock,
        categoriaId: this.productoEditando.categoriaId,
      };

      this.productoService.crearProducto(productoCrear).subscribe({
        next: () => {
          this.modoEdicion = false;
          this.cargarProductos();

          const modal = document.getElementById('productoModal');
          if (modal) (window as any).bootstrap.Modal.getInstance(modal)?.hide();
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear producto');
        },
      });
    } else {
      const productoActualizar = {
        nombre: this.productoEditando.nombre,
        descripcion: this.productoEditando.descripcion,
        precio: this.productoEditando.precio,
        marca: this.productoEditando.marca,
        stock: this.productoEditando.stock,
        categoriaId: this.productoEditando.categoriaId,
        activo: this.productoEditando.activo,
      };

      this.productoService
        .actualizarProducto(this.productoEditando.id, productoActualizar)
        .subscribe({
          next: () => {
            this.productoSeleccionado = { ...this.productoEditando } as Producto;
            this.modoEdicion = false;

            this.cargarProductos();

            const modal = document.getElementById('productoModal');
            if (modal) {
              (window as any).bootstrap.Modal.getInstance(modal)?.hide();
            }
          },
          error: (err) => {
            console.error(err);
            alert('Error al actualizar producto');
          },
        });
    }
  }
}
