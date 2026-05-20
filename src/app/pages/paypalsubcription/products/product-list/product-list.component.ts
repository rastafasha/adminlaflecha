import { Component } from '@angular/core';
import { planPaypalSubcription, productPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  public productpaypalSeleccionado: planPaypalSubcription;

  title = 'Productos Paypal';
  error: string;
  loading = false;
  tipoSeleccionado: any | null
  productsPaypal: productPaypalSubcription;
  p: number = 1;
  count: number = 8;
  productSeleccionado: productPaypalSubcription;
  query: string = '';

  constructor(
    private planpaypalService: PlanPaypalSubcriptionService,
    private busquedasService: BusquedasService,
  ) { }


  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.loading = true;
    this.planpaypalService.getProducts().subscribe(
      (res: any) => {
        this.productsPaypal = res;
        error => this.error = error;
        this.loading = false;
      }
    );
  }

  PageSize() {
    this.getProductos();
  }



  eliminarProduct(product: productPaypalSubcription) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planpaypalService.deleteProduct(product.id).subscribe(
          response => {
            this.getProductos();
          }
        );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });
  }

  onEditProject(product: productPaypalSubcription) {
    this.productSeleccionado = product;
  }

  openEditModal(): void {
    this.productSeleccionado = null;
  }

  onCloseModal(): void {
    this.productSeleccionado = null;
  }

  onClose() { }

   search(): void {
    if (!this.query) {
      this.ngOnInit();
    } else {
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp: any) => {
          this.productsPaypal = resp.planpaypals;
        }
      )
    }
  }



}
