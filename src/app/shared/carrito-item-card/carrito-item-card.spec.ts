import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoItemCard } from './carrito-item-card';

describe('CarritoItemCard', () => {
  let component: CarritoItemCard;
  let fixture: ComponentFixture<CarritoItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoItemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoItemCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
