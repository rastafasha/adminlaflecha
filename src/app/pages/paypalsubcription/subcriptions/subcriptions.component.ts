import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-subcriptions',
    templateUrl: './subcriptions.component.html',
    styleUrls: ['./subcriptions.component.css'],
    standalone: false
})
export class SubcriptionsComponent implements OnInit, OnChanges {

   @Input() planSeleccionado;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshPlanesList: EventEmitter<void> = new EventEmitter<void>();

  // title = "Paypal | Subcripciones"

  subcriptionPaypals: planPaypalSubcription;
  subcriptions: any ;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  query:string ='';

  constructor(
    private planPaypalSubcriptionService: PlanPaypalSubcriptionService,
    private busquedasService: BusquedasService,
    private router: Router,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getSubcriptions();
    window.scrollTo(0,0);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['planSeleccionado'] &&
      changes['planSeleccionado'].currentValue
    ) {
      const plan = changes['planSeleccionado'].currentValue;
      
      this.planSeleccionado ;
      this.planPaypalSubcriptionService.getSubcription(plan.id).subscribe(
      (res:any) =>{
        console.log(res)
        this.subcriptions = res;
        error => this.error = error;
      }
    );

      
    } 
  }

   onClose() {
    this.planSeleccionado = null;
    // Emit event to parent to reset the projectSeleccionado variable
    this.refreshPlanesList.emit();
    this.closeModal.emit();
  }

  getSubcriptions(): void {
    this.loading = true;
    this.planPaypalSubcriptionService.getSubcriptions().subscribe(
      res =>{
        this.subcriptions = res;
        error => this.error = error;
        this.loading = false;
      }
    );
  }
  PageSize() {
    this.getSubcriptions();
  }

  search(): void {
    if(!this.query){
      this.ngOnInit();
    }else{
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp:any) => {
          this.subcriptions = resp.subcriptions;
          
        }
      )
    }    
  }

  


}
