import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Categoria } from '../../../models/categoria';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-categorias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias-admin.html',
  styleUrl: './categorias-admin.css',
})
export class CategoriasAdmin implements OnInit {
  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria | null = null;
  categoriaEditando: any = null;
  modoEdicion: boolean = false;
  busqueda: string = '';
  private busquedaSubject = new Subject<string>();

  constructor(
    private categoriaService: CategoriasService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();

    this.busquedaSubject.pipe(debounceTime(500)).subscribe((texto) => {
      this.buscar(texto);
    });
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (err: any) => {
        this.toast.error(err.message || 'Error al cargar categorías');
      },
    });
  }

  abrirModal(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.modoEdicion = false;

    this.categoriaEditando = {
      ...categoria,
      parent: categoria.parent || null,
      categoriaPadreId: categoria.parent?.id || null,
      activo: categoria.activo !== undefined ? categoria.activo : true,
    };
  }

  nuevaCategoria() {
    this.modoEdicion = true;

    this.categoriaEditando = {
      id: 0,
      nombre: '',
      categoriaPadreId: null,
      activo: true,
    };
  }

  cerrarModal() {
    this.categoriaEditando = null;
    this.categoriaSeleccionada = null;
    this.modoEdicion = false;
  }

  guardarCambios() {
    if (!this.categoriaEditando) return;

    if (this.categoriaEditando.id === 0) {
      const categoriaCrear = {
        nombre: this.categoriaEditando.nombre,
        categoriaPadreId: this.categoriaEditando.categoriaPadreId,
      };

      this.categoriaService.crearCategoria(categoriaCrear).subscribe({
        next: () => {
          this.modoEdicion = false;
          this.cargarCategorias();

          const modal = document.getElementById('categoriaModal');
          if (modal) (window as any).bootstrap.Modal.getInstance(modal)?.hide();
        },
        error: (err: any) => {
          this.toast.error(err.message || 'Error al crear categoría');
        },
      });
    } else {
      const categoriaActualizar = {
        nombre: this.categoriaEditando.nombre,
        categoriaPadreId: this.categoriaEditando.categoriaPadreId,
        activo: this.categoriaEditando.activo,
      };

      this.categoriaService
        .actualizarCategoria(this.categoriaEditando.id, categoriaActualizar)
        .subscribe({
          next: () => {
            this.categoriaSeleccionada = { ...this.categoriaEditando };
            this.modoEdicion = false;

            this.cargarCategorias();

            const modal = document.getElementById('categoriaModal');
            if (modal) {
              (window as any).bootstrap.Modal.getInstance(modal)?.hide();
            }
          },
          error: (err: any) => {
            this.toast.error(err.message || 'Error al actualizar categoría');
          },
        });
    }
  }

  buscar(texto: string) {
    if (!texto || texto.trim() === '') {
      this.cargarCategorias();
      return;
    }

    this.categoriaService.buscarCategorias(texto).subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (err: any) => {
        this.toast.error(err.message || 'Error al buscar categorías');
      },
    });
  }

  onBuscarChange() {
    this.busquedaSubject.next(this.busqueda);
  }
}
