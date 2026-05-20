import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Angular plugin.
import { NgxPaginationModule } from 'ngx-pagination';
// import { NgxPayPalModule } from 'ngx-paypal';
// import { ChartComponent } from './chart/chart.component';
// import { NgChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';

import { PagosRecientesComponent } from './pagos-recientes/pagos-recientes.component';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';
import { ReciboFacturaComponent } from './recibo-factura/recibo-factura.component';
import {PipesModule} from '../pipes/pipes.module';
import { ModalCondicionesComponent } from './modal-condiciones/modal-condiciones.component';
import { SubscripcionesRecientesComponent } from './subscripciones-recientes/subscripciones-recientes.component';
import { ModalInicialComponent } from './modal-inicial/modal-inicial.component';
import { ModalInstruccionesComponent } from './modal-instrucciones/modal-instrucciones.component';

@NgModule({
  declarations: [
    PagosRecientesComponent,
    ReciboFacturaComponent,
    UsuariosRecientesComponent,
    ModalCondicionesComponent,
    SubscripcionesRecientesComponent,
    ModalInicialComponent,
    ModalInstruccionesComponent
  ],
  exports: [
    PagosRecientesComponent,
    ReciboFacturaComponent,
    UsuariosRecientesComponent,
    ModalCondicionesComponent,
    SubscripcionesRecientesComponent,
    ModalInicialComponent,
    ModalInstruccionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    // NgxPayPalModule,
    NgxPaginationModule,
  ]
})
export class ComponentsModule { }
