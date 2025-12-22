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
import { MiCuenta } from './pages/mi-cuenta/mi-cuenta';
import { Pedidos } from './pages/pedidos/pedidos';
import { Recuperar } from './pages/recuperar/recuperar';
import { Registro } from './pages/registro/registro';

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
      { path: 'cuenta', component: MiCuenta },
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

