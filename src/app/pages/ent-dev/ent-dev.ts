import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-ent-dev',
  imports: [RouterLink],
  templateUrl: './ent-dev.html',
  styleUrl: './ent-dev.css',
})
export class EntDev {
  buscar(texto: string) {
    const busqueda = encodeURIComponent(texto);
    window.open (
      `https://www.google.com/search?q=${busqueda}`,
      '_blank'
    );
  }
}
