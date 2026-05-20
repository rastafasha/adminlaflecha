import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { generateSubcription, planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';

@Component({
  selector: 'app-subcription',
  templateUrl: './subcription.component.html',
  styleUrls: ['./subcription.component.css'],
  standalone: false
})
export class SubcriptionComponent implements OnInit {

  title = "Detalle Subcripcion";
  public subcriptionPaypals: generateSubcription[] = [];
  public subcriptionPaypal: any;

  error: string;


  public usuario: User;
  user: User;

  supcripcionSeleccionado: planPaypalSubcription;



  constructor(
    private planPaypalSubcriptionService: PlanPaypalSubcriptionService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UserService,

  ) {
    this.usuario = this.usuarioService.usuario
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(({ id }) => this.getSubcriptionById(id));
    this.getUser();
  }
  getSubcriptionById(_id: string) {
    this.planPaypalSubcriptionService.getSubcription(_id).subscribe(
      res => {
        this.subcriptionPaypal = res;
        error => this.error = error
        // console.log(this.subcriptionPaypal);
      }
    );
  }

  getUser(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }


}
