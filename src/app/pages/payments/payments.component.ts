import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { BusquedasService } from 'src/app/services/busqueda.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  standalone: false
})
export class PaymentsComponent implements OnInit {


  title = "Compras"
  loading = false;
  pagos: Payment;
  error: string;
  p: number = 1;
  count: number = 8;

  public user;

  query: string = '';
  pagoSeleccionado: Payment;


  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private http: HttpClient,
    private busquedasService: BusquedasService,
  ) {
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    this.closeMenu();
    this.getPagos();
    window.scrollTo(0, 0);
    // this.getPagos_list();
  }

  closeMenu() {
    var menuLateral = document.getElementsByClassName("sidebar");
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("active");

    }
  }

  getPagos(): void {
    this.loading = true;
    this.paymentService.getAll().subscribe(
      res => {
        this.pagos = res;
        this.loading = false;
        error => this.error = error;
      }
    );
  }

  PageSize() {
    this.getPagos();
  }

  search(): void {
    if (!this.query) {
      this.ngOnInit();
    } else {
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp: any) => {
          this.pagos = resp.pagos;

        }
      )
    }
  }

  onViewPago(pago: Payment) {
      this.pagoSeleccionado = pago;
    }
  
  
    onCloseModal(): void {
      this.pagoSeleccionado = null;
    }
  
    onClose(){}

}
