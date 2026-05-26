import { Component } from '@angular/core';
import { TasabcvService } from '../../services/tasabcv.service';

@Component({
  selector: 'app-tasadiabcv',
  standalone:false,
  templateUrl: './tasadiabcv.component.html',
  styleUrls: ['./tasadiabcv.component.css']
})
export class TasadiabcvComponent {

  isLoading:boolean = false;
  isProfile:boolean = false;
  precio_dia!:number;
  precio_fecha!:Date;
  user:any;

  constructor(
    private tasaBcvService: TasabcvService,
  ) {
  }
  ngOnInit() {
    this.getTasaDBcvdelDia();
    // console.log(this.user);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
  }
  getTasaDBcvdelDia() {
    this.isLoading = true;
    this.tasaBcvService.getUltimaTasa().subscribe((resp:any)=>{
      this.precio_dia = resp.precio_dia;
      this.precio_fecha = resp.createdAt;
      this.isLoading = false;
      // console.log(resp);
    })
  }
}
