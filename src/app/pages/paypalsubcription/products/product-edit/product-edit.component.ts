import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { productPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const urlFront = environment.urlFrontPage;
const urlImage = environment.imageURLProductsub;
declare var bootstrap: any;
@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnChanges {
  @Input() productSeleccionado: productPaypalSubcription;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshProductList: EventEmitter<void> = new EventEmitter<void>();
  public productopaypalForm: FormGroup;

  title: string;
  error: string;

  titlePage: string;
  tipoSeleccionado:any|null
  productPaypal: productPaypalSubcription;

  constructor(
    private fb: FormBuilder,
    private planpaypalService: PlanPaypalSubcriptionService,
  ) { }


  ngOnInit(): void {
    this.validarFormularioProducto();
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['productSeleccionado'] &&
      changes['productSeleccionado'].currentValue
    ) {
      this.title = 'Editando Product';
      const product = changes['productSeleccionado'].currentValue;

      this.planpaypalService.getProductPaypal(product.id).subscribe(
        (res: any) => {
          this.productSeleccionado = res;
          console.log(res)

          this.productopaypalForm.patchValue({
            id: this.productSeleccionado.id,
            name: this.productSeleccionado.name,
            description: this.productSeleccionado.description,
            type: this.productSeleccionado.type,
            category: this.productSeleccionado.category,
          });
        }
      );

      this.productSeleccionado = product;
      this.title = 'Editando Product';
    } else {
      this.title = 'Creando Product';
    }
  }

  onClose() {
    this.productSeleccionado = null;
    this.productopaypalForm.reset();
    this.title = 'Creando Product';
    // Also reset default values if needed
    this.productopaypalForm.patchValue({
      id: null,
      name: null,
      description: null,
      type: null,
      category: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }

  validarFormularioProducto() {
    this.productopaypalForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      image_url: [''],
    })
  }


  updateProduct() {

    if(!this.productopaypalForm.valid){
      //mostramos las alertas de los campos requeridos
      this.productopaypalForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const { name, description, type, image_url,
      category } = this.productopaypalForm.value;

    if (this.productSeleccionado) {
      //actualizar
      const data = {
        ...this.productopaypalForm.value,
        id: this.productSeleccionado.id
      }
      this.planpaypalService.updateProduct(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editProduct');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          // Emit event to refresh project list
          this.refreshProductList.emit();
          this.ngOnInit()
        });

    } else {
      //crear
      const productData = {
        name: this.productopaypalForm.value.name,
        description: this.productopaypalForm.value.description,
        type: this.productopaypalForm.value.type, // O SERVICE/PHYSICAL según tu caso
        category: this.productopaypalForm.value.category, // PayPal tiene categorías específicas, SOFTWARE es común
        image_url: urlImage,
        home_url: urlFront // Opcional pero recomendado
      };

      this.planpaypalService.createProducSubcription(productData).subscribe((resp: any) => {
        const newProductId = resp.id; // Este es el ID que usarás en el formulario del PLAN
        Swal.fire('Producto Creado', `ID: ${newProductId}`, 'success');
        // Close modal programmatically
          const modalElement = document.getElementById('editProduct');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          // Emit event to refresh project list
          this.refreshProductList.emit();
          this.ngOnInit()

      });


    }

  }
}

