import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { planPaypalSubcription, productPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';

declare var bootstrap: any;
@Component({
  selector: 'app-paypalsubcription-edit',
  templateUrl: './paypalsubcription-edit.component.html',
  styleUrls: ['./paypalsubcription-edit.component.css'],
  standalone: false
})
export class PaypalsubcriptionEditComponent implements OnInit, OnChanges {
  @Input() planSeleccionado: planPaypalSubcription;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshPlanesList: EventEmitter<void> = new EventEmitter<void>();

  public planpaypalForm: FormGroup;

  public planpaypalSeleccionado: planPaypalSubcription;

  title: string;
  error: string;

  titlePage: string;
  plans: planPaypalSubcription;
  productPaypal: productPaypalSubcription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private planpaypalService: PlanPaypalSubcriptionService,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.validarFormulario();
    this.getProductos();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['planSeleccionado'] &&
      changes['planSeleccionado'].currentValue
    ) {
      this.title = 'Editando Plan';
      const plan = changes['planSeleccionado'].currentValue;

      this.planpaypalService.getPlanPaypal(this.planSeleccionado.id).subscribe(
        (res: any) => {
          // Extraemos los valores de la estructura de PayPal
          const ciclyData = res.billing_cycles ? res.billing_cycles[0] : null;

          if (this.planpaypalForm) {
            this.planpaypalForm.patchValue({
              id: res.id,
              name: res.name,
              product_id: res.product_id,
              status: res.status,
              // Accedemos a la profundidad del objeto de PayPal
              frequency: res.frequency,
              percentage: res.percentage,
              total_cycles: ciclyData ? ciclyData.total_cycles : 0,
              fixed_price: ciclyData ? ciclyData.pricing_scheme.fixed_price.value : 0,
              setup_fee: res.payment_preferences?.setup_fee?.value || 0,
              interval_unit: ciclyData ? ciclyData.frequency.interval_unit : 'MONTH'
            });
          }
        }
      );

      this.planSeleccionado = plan;
      this.title = 'Editando Plan';
    } else {
      this.title = 'Creando Plan';
    }
  }

  onClose() {
    this.planSeleccionado = null;
    this.title = 'Creando Proyecto';
    if (this.planpaypalForm) {
      this.planpaypalForm.reset();
      // Also reset default values if needed
      this.planpaypalForm.patchValue({
        id: null,
        name: null,
        product_id: null,
        status: null,
        // Accedemos a la profundidad del objeto de PayPal
        frequency: null,
        percentage: null,
        total_cycles: 0,
        fixed_price: 0,
        setup_fee: 0,
        interval_unit: null
      });
    }
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }



  getProductos(): void {
    this.planpaypalService.getProducts().subscribe(
      res => {
        this.productPaypal = res;
        error => this.error = error;
      }
    );
  }



  validarFormulario() {
    this.planpaypalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      product_id: ['', Validators.required], // ID por defecto
      status: ['ACTIVE'],
      total_cycles: [0], // 0 = Infinito
      fixed_price: ['0.00', [Validators.required]], // Por defecto 0.00
      setup_fee: ['0.00'],
      interval_unit: ['MONTH', Validators.required], // MONTH, YEAR, etc.
    });
  }

  get name() {
    return this.planpaypalForm.get('name');
  }
  get product_id() {
    return this.planpaypalForm.get('product_id');
  }
  get status() {
    return this.planpaypalForm.get('status');
  }
  get interval_unit() {
    return this.planpaypalForm.get('interval_unit');
  }
  get total_cycles() {
    return this.planpaypalForm.get('total_cycles');
  }
  get setup_fee() {
    return this.planpaypalForm.get('setup_fee');
  }
  get percentage() {
    return this.planpaypalForm.get('percentage');
  }
  get fixed_price() {
    return this.planpaypalForm.get('fixed_price');
  }



  editPlan() {

    if (!this.planpaypalForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.planpaypalForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }


    const {
      name,
      product_id,
      interval_unit,
      total_cycles,
      setup_fee,
      fixed_price
    } = this.planpaypalForm.value;

    if (this.planSeleccionado) {
      //actualizar
      const data = {
        id: this.planSeleccionado.id,
        name: name,
        description: "Acceso completo a herramientas de la app y beneficios exclusivos"
      }
      this.planpaypalService.updatePlan(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editPlan');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          // Emit event to refresh project list
          this.refreshPlanesList.emit();
          this.ngOnInit();
        });

    } else {
      //crear

      // Validamos y formateamos los precios de forma segura contra NaN o vacíos
      const precioFijoFormateado = parseFloat(fixed_price || 0).toFixed(2);
      const cuotaInicialFormateada = parseFloat(setup_fee || 0).toFixed(2);

      // 1. CREAMOS EL CUERPO CON LA ESTRUCTURA QUE PAYPAL EXIGE
      const bodyPayPal = {
        product_id: product_id,
        name: name,
        description: "Acceso completo a herramientas de la app y beneficios exclusivos",
        billing_cycles: [
          {
            frequency: {
              interval_unit: (interval_unit || 'MONTH').toUpperCase(),
              interval_count: 1
            },
            tenure_type: "REGULAR",
            sequence: 1,
            // Si el usuario pone 0, PayPal lo entiende como cobros infinitos
            total_cycles: Number(total_cycles) || 0,
            pricing_scheme: {
              fixed_price: {
                // .toFixed(2) asegura que 10 se convierta en "10.00"
                value: precioFijoFormateado,
                currency_code: "USD"
              }
            }
          }
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee: {
            value: cuotaInicialFormateada,
            currency_code: "USD"
          },
          setup_fee_failure_action: "CONTINUE",
          payment_failure_threshold: 3
        }
      }

      this.planpaypalService.createPlanSubcription(bodyPayPal)
        .subscribe((resp: any) => {

          this.notificarYLimpiar('Creado', 'creado correctamente');
        })
    }
  }

  private notificarYLimpiar(titulo: string, mensaje: string) {
    Swal.fire(titulo, mensaje, 'success');
    const modalElement = document.getElementById('editPlan');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
    this.refreshPlanesList.emit();
    this.ngOnInit();
  }

}

