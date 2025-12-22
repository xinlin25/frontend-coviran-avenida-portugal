import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntDev } from './ent-dev';

describe('EntDev', () => {
  let component: EntDev;
  let fixture: ComponentFixture<EntDev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntDev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntDev);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
