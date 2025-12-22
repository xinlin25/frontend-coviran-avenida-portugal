import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProd } from './detalle-prod';

describe('DetalleProd', () => {
  let component: DetalleProd;
  let fixture: ComponentFixture<DetalleProd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
