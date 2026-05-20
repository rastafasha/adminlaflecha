import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false
})
export class UsersComponent implements OnInit {
  title = "Usuarios"

  loading = false;
  usersCount = 0;
  usuarios: any;
  user: User;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;
  ServerUrl = environment.apiUrl;
  query: string = '';

  option_selectedd: number = 1;
    solicitud_selectedd: any = 1;

    info = `
  <p>En esta sección podrás:</p>
          <ul>
            <li>Ver la Información de Cada Usuario</li>
            <li>Pulsa sobre el nombre o sobre el boton editar (lapiz)</li>
            <li>La Lista esta filtrada por Usuarios generales y Editores</li>
            <li>Dentro del perfil del usuario podras ver: Historial de compras Subscripciones</li>
            <li>Si el perfil es Editor o Admin, dentro del perfil del usuario podras ver: Blogs Creados e informacion descrita en el punta anterior</li>
          </ul>`;

  constructor(
    private userService: UserService,
    private busquedasService: BusquedasService,
    private http: HttpClient,
    handler: HttpBackend,

  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.closeMenu();
    this.getUsers();
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
        this.loading = false;
        error => this.error = error;
      }
    );
  }

  PageSize() {
    this.getUsers();
  }


  eliminarUser(user: User) {
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
        this.userService.deleteById(user).subscribe(
          response => {
            this.getUsers();
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


  closeMenu() {
    var menuLateral = document.getElementsByClassName("sidebar");
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("active");

    }
  }

  search(): void {

    if (!this.query) {
      this.ngOnInit();
    } else {
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp: any) => {
          this.usuarios = resp.usuarios;

        }
      )
    }
  }


  optionSelected(value: number) {
      this.option_selectedd = value;
      if (this.option_selectedd === 1) {
  
        // this.ngOnInit();
      }
      if (this.option_selectedd === 2) {
        this.solicitud_selectedd = null;
      }
    }





}
