import { MainLayout } from './layout/main-layout/main-layout';
import { SimpleLayout } from './layout/simple-layout/simple-layout';

import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion'
import { Carrito } from './pages/carrito/carrito';
import { Categorias } from './pages/categorias/categorias';
import { DetalleProd } from './pages/detalle-prod/detalle-prod';
import { Empleados } from './pages/empleados/empleados';
import { EntDev } from './pages/ent-dev/ent-dev';
import { LocCon } from './pages/loc-con/loc-con';
import { MiPerfil } from './pages/mi-perfil/mi-perfil';
import { Pedidos } from './pages/pedidos/pedidos';
import { Recuperar } from './pages/recuperar/recuperar';
import { Registro } from './pages/registro/registro';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Inicio },
      { path: 'categorias', component: Categorias },
      { path: 'detalle-producto', component: DetalleProd },
      { path: 'localizacion-contacto', component: LocCon },
      { path: 'entrega-devoluciones', component: EntDev },
      { path: 'mi-perfil', component: MiPerfil, canActivate: [authGuard] },
      { path: 'pedidos', component: Pedidos }
    ]
  },

  {
    path: '',
    component: SimpleLayout,
    children: [
      { path: 'registro', component: Registro },
      { path: 'recuperar-contraseña', component: Recuperar },
      { path: 'carrito', component: Carrito },
      { path: 'empleados', component: Empleados },
      { path: 'inicio-sesion', component: InicioSesion}
    ]
  }
];

