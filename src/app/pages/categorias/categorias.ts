import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';

import { Menu } from '../../shared/menu/menu';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, Menu, RouterOutlet],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css'],
})
export class Categorias {}
