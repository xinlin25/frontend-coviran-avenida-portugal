import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocCon } from './loc-con';

describe('LocCon', () => {
  let component: LocCon;
  let fixture: ComponentFixture<LocCon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocCon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocCon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
