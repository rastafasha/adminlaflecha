import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
declare var bootstrap: any;
@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.css'],
    standalone: false
})
export class PaymentDetailsComponent implements OnInit, OnChanges {
  @Input() pagoSeleccionado;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  title = "Detalle Compra";
  public payment: Payment[] =[];
  public pago: Payment;
  public blogs: any = {};
  public blog: any = {};
  error: string;
  loading = false;

  public paymentForm: FormGroup;
  public usuario: User;
  public pagos: Payment;
  user: User;


  public imagenSubir: File;
  public imgTemp: any = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private http: HttpClient,
    private fb: FormBuilder,
    private paymentsService: PaymentService,
    private usuarioService: UserService,
    private fileUploadService: FileUploadService,
    
  ) { 
    this.usuario = this.usuarioService.usuario
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPayment(id));
    this.validarFormulario();
  }
  
  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['pagoSeleccionado'] &&
      changes['pagoSeleccionado'].currentValue
    ) {
      
      this.pagoSeleccionado ;
      this.usuario = this.pagoSeleccionado.usuario
      this.blog = this.pagoSeleccionado.blog

      const pago = changes['pagoSeleccionado'].currentValue;
      this.paymentForm.patchValue({
        id: pago._id,
        validacion: pago.validacion,
      });
    } 
  }

   onClose() {
    this.pagoSeleccionado = null;
    this.paymentForm.reset();
    this.title = 'Creando Pago';
    // Also reset default values if needed
    this.paymentForm.patchValue({
      id: null,
      status: null,
      validacion: null,
      user_id: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }
  



  validarFormulario(){
    this.paymentForm = this.fb.group({
      status: ['',Validators.required],
      validacion: ['',Validators.required],
      user_id: [''],
    })
  }

  cargarPayment(_id: string){
    if (_id !== null && _id !== undefined) {
      this.paymentsService.getPagoById(_id).subscribe(
        res => {
          this.paymentForm.patchValue({
            id: res._id,
            status: res.status,
            validacion: res.validacion,
          });
          this.pagoSeleccionado = res;
          // console.log(this.pagoSeleccionado);
        }
      );
    }

  }

  get status() {
    return this.paymentForm.get('status');
  }
  get validacion() {
    return this.paymentForm.get('validacion');
  }

  updatePago(){

    const formData = new FormData();
    formData.append('status', this.paymentForm.get('status').value);
    formData.append('validacion', this.paymentForm.get('validacion').value);

    if(this.pago){
      //actualizar
      const data = {
        ...this.paymentForm.value,
        _id: this.pagoSeleccionado._id
      }
      this.paymentsService.updateStatus(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', ` actualizado correctamente`, 'success');
          this.ngOnInit();
        });

    }else{
      return;
    }

  }


}
