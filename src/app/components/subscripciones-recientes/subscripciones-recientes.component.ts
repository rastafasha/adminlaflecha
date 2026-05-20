import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PaymentService } from 'src/app/services/payment.service';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';


@Component({
    selector: 'app-subscripciones-recientes',
    templateUrl: './subscripciones-recientes.component.html',
    styleUrls: ['./subscripciones-recientes.component.css'],
    standalone: false
})
export class SubscripcionesRecientesComponent implements OnInit {

  subcriptionPaypals: planPaypalSubcription;
  subcriptions: any ;
  error:string;

  constructor(
    private planPaypalSubcriptionService: PlanPaypalSubcriptionService,
  ) { }

  ngOnInit(): void {
    this.getPagosRecientes();
  }

  getPagosRecientes(): void {
    this.planPaypalSubcriptionService.getSubcriptions().subscribe(
      res =>{
        this.subcriptionPaypals = res;
        error => this.error = error
        console.log(this.subcriptionPaypals);
      }
    );
  }

}
