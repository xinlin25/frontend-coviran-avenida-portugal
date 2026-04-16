import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/']);
  }
}
