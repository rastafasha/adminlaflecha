import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css'],
  standalone: false
})
export class PaymentEditComponent implements OnInit {

  title: string;
  public paymentForm: FormGroup;

  public pago: Payment;
  public usuario: User;
  public pagos: Payment;

  error: string;
  user: User;


  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentsService: PaymentService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPayment(id));
    this.validarFormulario();
  }

  validarFormulario() {
    this.paymentForm = this.fb.group({
      status: ['', Validators.required],
      validacion: ['', Validators.required],
      user_id: [''],
    })
  }

  cargarPayment(_id: string) {
    if (_id !== null && _id !== undefined) {
      this.title = 'Verificando Pago';
      this.paymentsService.getPagoById(_id).subscribe(
        res => {
          this.paymentForm.patchValue({
            id: res._id,
            status: res.status,
            validacion: res.validacion,
          });
          this.pago = res;
          console.log(this.pago);
        }
      );
    } else {
      this.title = 'Creando Pago';
    }

  }

  get status() {
    return this.paymentForm.get('status');
  }
  get validacion() {
    return this.paymentForm.get('validacion');
  }

  updatePago() {

    const formData = new FormData();
    formData.append('status', this.paymentForm.get('status').value);
    formData.append('validacion', this.paymentForm.get('validacion').value);

    if (this.pago) {
      //actualizar
      const data = {
        ...this.paymentForm.value,
        _id: this.pago._id
      }
      this.paymentsService.updateStatus(data).subscribe(
        resp => {
          Swal.fire('Actualizado', ` actualizado correctamente`, 'success');

          this.router.navigateByUrl(`/dashboard/payments`);
        });

    } else {
      return;
    }

  }


}
