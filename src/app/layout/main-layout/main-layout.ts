import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, FormsModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  busqueda: string = '';

  constructor(
    public authService: Auth,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  buscar() {
    if (!this.busqueda.trim()) return;

    this.router.navigate(['/busqueda'], {
      queryParams: {
        q: this.busqueda,
      },
    });
  }
}
