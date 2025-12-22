import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loc-con',
  imports: [RouterLink],
  templateUrl: './loc-con.html',
  styleUrl: './loc-con.css',
})
export class LocCon {
  buscar(texto: string) {
    const busqueda = encodeURIComponent(texto);
    window.open (
      `https://www.google.com/search?q=${busqueda}`,
      '_blank'
    );
  }
}
