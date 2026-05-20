import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-recibo-factura',
    templateUrl: './recibo-factura.component.html',
    styleUrls: ['./recibo-factura.component.css'],
    standalone: false
})
export class ReciboFacturaComponent implements OnInit {

  title = "Factura";
  public pago: Payment[];
  error: string;
  usuario: User;

  @Input() amount;
  @Input() items;
  @Input() reference;
  @Input() email;
  @Input() name;
  @Input() status;


  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private userService: UserService,
  ) { 
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }

  getPagoById(_id:string){
    this.paymentService.getPagosbyUser(this.usuario.uid).subscribe(
      res =>{
        this.pago = res;
        error => this.error = error;
        console.log(this.pago);
      }
    );
  }

}
