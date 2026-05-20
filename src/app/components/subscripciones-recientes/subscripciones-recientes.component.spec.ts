import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscripcionesRecientesComponent } from './subscripciones-recientes.component';

describe('SubscripcionesRecientesComponent', () => {
  let component: SubscripcionesRecientesComponent;
  let fixture: ComponentFixture<SubscripcionesRecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscripcionesRecientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscripcionesRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
