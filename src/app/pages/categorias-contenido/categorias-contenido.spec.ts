import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasContenido } from './categorias-contenido';

describe('CategoriasContenido', () => {
  let component: CategoriasContenido;
  let fixture: ComponentFixture<CategoriasContenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasContenido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasContenido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
