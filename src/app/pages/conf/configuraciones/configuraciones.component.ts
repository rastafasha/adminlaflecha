import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-configuraciones',
    templateUrl: './configuraciones.component.html',
    styleUrls: ['./configuraciones.component.css'],
    standalone: false
})
export class ConfiguracionesComponent implements OnInit, DoCheck {

  title = "Configuraciones";
  error: string;

  user: User;

  info = `
  <p>En esta sección podrás:</p>
          <ul>
            <li>Crear Categorías para los Posts</li>
            <li>Gestionar los Roles de cada Usuario</li>
          </ul>`;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.closeMenu();
    window.scrollTo(0,0);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  ngDoCheck(): void {
    this.user = this.userService.usuario;
  }


}
