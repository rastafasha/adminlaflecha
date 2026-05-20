import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-user-historialpagos',
  templateUrl: './user-historialpagos.component.html',
  styleUrls: ['./user-historialpagos.component.css'],
  standalone: false
})
export class UserHistorialpagosComponent implements OnInit {
  title = "Historial Mis Compras";
  userProfile!: User;
  userPagos!: Payment;
  user: User;
  uid: string;

  p: number = 1;
  count: number = 8;

  constructor(
    private userService: UserService,
    private pagoService: PaymentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userService.closeMenu();
    this.getUser();
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    this.getUserProfile();
    this.getUserPagos();

  }

  getUserProfile() {

    this.userService.getUserById(this.uid).subscribe((data: any) => {
      this.userProfile = data;
      console.log('userProfile', this.userProfile)
    });
  }


  getUserPagos() {

    this.pagoService.getPagosbyUser(this.uid).subscribe((data: any) => {
      this.userPagos = data;
      console.log('userPagos', this.userPagos)
    });
  }


}
