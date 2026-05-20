import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { Router } from '@angular/router';
import { BusquedasService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-paypalsubcription-index',
  templateUrl: './paypalsubcription-index.component.html',
  styleUrls: ['./paypalsubcription-index.component.css'],
  standalone: false
})
export class PaypalsubcriptionIndexComponent implements OnInit {

  title = "Paypal | Planes"
  plans: planPaypalSubcription;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  data: any
  query: string = '';
  planSeleccionado: planPaypalSubcription;

  info = `
  <p>En esta sección:</p>
          <ul>
            <li>Solo se pueden crear planes</li>
            <li>Seleccionar un Producto Anteriormente creado para relacionarlo al plan</li>
            <li>Solo se puede activar y desactivar planes</li>
            <li>Para ver las subscripciones del plan solo se mostrarian los activos</li>
           
          </ul>`;

  constructor(
    private planpaypalService: PlanPaypalSubcriptionService,
    private router: Router,
    handler: HttpBackend,
    private busquedasService: BusquedasService,

  ) {
  }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0, 0);
  }

  getPlanes(): void {
    this.loading = true;
    this.planpaypalService.getPlanPaypalsPage(this.p, this.count).subscribe(
      (res: any) => {
        this.plans = res.planPaypal.plans;
        error => this.error = error;
        this.loading = false;
      }
    );
  }

  PageSize() {
    this.getPlanes();
  }

  search(): void {
    if (!this.query) {
      this.ngOnInit();
    } else {
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp: any) => {
          this.plans = resp.planpaypals;
        }
      )
    }
  }

  toggleStatus(plan: any) {
    if (plan.status === 'ACTIVE') {
      this.desactivar(plan.id);
    } else {
      this.activar(plan.id);
    }
  }

  desactivar(id) {
    this.planpaypalService.desactivar(id).subscribe(
      response => {
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getPlanes();
      },
      error => {
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id) {
    this.planpaypalService.activar(id).subscribe(
      response => {

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getPlanes();
      },
      error => {
        this.msm_error = 'No se pudo activar el curso, vuelva a intenter.'
      }
    )
  }

  onEditProject(plan: planPaypalSubcription) {
    this.planSeleccionado = plan;
    console.log(this.planSeleccionado)
  }

  openEditModal(): void {
    this.planSeleccionado = null;
  }

  onCloseModal(): void {
    this.planSeleccionado = null;
  }

  onViewSubscripciones(plan: planPaypalSubcription) {
    this.planSeleccionado = plan;
  }

  onClose() { }



}
