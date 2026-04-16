import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';

@Component({
  selector: 'app-simple-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './simple-layout.html',
  styleUrl: './simple-layout.css',
  standalone: true,
})
export class SimpleLayout {
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/']);
  }
}
