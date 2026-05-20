import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-paypalhome',
  templateUrl: './paypalhome.component.html',
  styleUrls: ['./paypalhome.component.css'],
  standalone: false
})
export class PaypalhomeComponent implements OnInit {

  title = "Paypal :: Planes - Subcripciones";
  error: string;

  user: User;

  info = `
  <p>En esta sección podrás:</p>
          <ul>
            <li>Crear planes de subcripción directamente a Paypal </li>
            <li>En la sección Producto podrás gestionar cada Producto </li>
            <li>Primero Crea un Producto: en la sección producto, para relacionar el producto con el plan</li>
            <li>Luego el Plan, llenando todos los campos necesarios</li>
            <li>En la sección Planes podrás gestionar cada Plan </li>
          </ul>`;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.closeMenu();
    window.scrollTo(0, 0);
  }

  closeMenu() {
    var menuLateral = document.getElementsByClassName("sidebar");
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("active");

    }
  }

  ngDoCheck(): void {
    this.user = this.userService.usuario;
  }


}
