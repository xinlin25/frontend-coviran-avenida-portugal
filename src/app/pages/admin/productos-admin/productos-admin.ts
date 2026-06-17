import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/productos/productos.service';
import { ToastService } from '../../../services/toast/toast.service';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Categoria } from '../../../models/categoria';

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
  categorias: Categoria[] = [];
  imagenesSeleccionadas: File[] = [];
  destacado?: boolean;
  paginaActual = 1;
  elementosPorPagina = 10;

  private busquedaSubject = new Subject<string>();

  constructor(
    private productoService: ProductoService,
    private toast: ToastService,
  ) {}

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
      error: (err: any) => {
        this.toast.error('Error al cargar productos');
      },
    });
  }

  cargarCategorias() {
    this.productoService.getCategorias().subscribe({
      next: (data: any[]) => {
        this.categorias = data;
      },
      error: (err) => {
        this.toast.error('Error al cargar categorías');
      },
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
      error: (err: any) => {
        this.toast.error('Error al buscar productos');
      },
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
      destacado: producto.destacado !== undefined ? producto.destacado : false,
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
      activo: true,
      imagenUrl: [],
      enOferta: false,
      precioOferta: 0,
      destacado: false,
    };
  }

  onImagenSeleccionada(event: any) {
    const archivos = Array.from(event.target.files || []) as File[];

    this.imagenesSeleccionadas = archivos;
  }

  cerrarModal() {
    this.productoEditando = null;
    this.productoSeleccionado = null;
    this.modoEdicion = false;
    this.imagenesSeleccionadas = [];
  }

  guardarCambios() {
    if (!this.productoEditando) return;

    if (this.productoEditando.id === 0) {
      const formData = new FormData();

      formData.append('nombre', this.productoEditando.nombre);
      formData.append('descripcion', this.productoEditando.descripcion);
      formData.append('precio', this.productoEditando.precio.toString());
      formData.append('marca', this.productoEditando.marca);
      formData.append('stock', this.productoEditando.stock.toString());
      formData.append('categoriaId', this.productoEditando.categoriaId.toString());

      formData.append('activo', this.productoEditando.activo.toString());

      formData.append('enOferta', this.productoEditando.enOferta.toString());

      formData.append('precioOferta', this.productoEditando.precioOferta.toString());
      formData.append('destacado', this.productoEditando.destacado.toString());
      this.imagenesSeleccionadas.forEach((imagen) => formData.append('imagenes', imagen));

      this.productoService.crearProducto(formData).subscribe({
        next: () => {
          this.modoEdicion = false;
          this.cargarProductos();

          const modal = document.getElementById('productoModal');
          if (modal) (window as any).bootstrap.Modal.getInstance(modal)?.hide();
        },
        error: (err) => {
          this.toast.error('Error al crear producto');
        },
      });
    } else {
      const formData = new FormData();
      formData.append('nombre', this.productoEditando.nombre);
      formData.append('descripcion', this.productoEditando.descripcion);
      formData.append('precio', this.productoEditando.precio.toString());
      formData.append('marca', this.productoEditando.marca);
      formData.append('stock', this.productoEditando.stock.toString());
      formData.append('categoriaId', this.productoEditando.categoriaId.toString());
      formData.append('activo', this.productoEditando.activo.toString());
      formData.append('enOferta', this.productoEditando.enOferta.toString());
      formData.append('precioOferta', this.productoEditando.precioOferta.toString());
      formData.append('destacado', this.productoEditando.destacado.toString());
      this.imagenesSeleccionadas.forEach((imagen) => formData.append('imagenes', imagen));

      this.productoService.actualizarProducto(this.productoEditando.id, formData).subscribe({
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
          this.toast.error('Error al actualizar producto');
        },
      });
    }
  }

  get itemsPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    return this.productos.slice(inicio, fin);
  }

  get totalPaginas() {
    return Math.ceil(this.productos.length / this.elementosPorPagina);
  }

  obtenerImagenesProducto(producto: Producto | any): string[] {
    const imagenes = producto?.imagenUrl as string[] | string | undefined;
    if (Array.isArray(imagenes)) return imagenes;
    return imagenes ? [imagenes] : [];
  }
}
