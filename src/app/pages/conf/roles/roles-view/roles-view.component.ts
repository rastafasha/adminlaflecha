import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-roles-view',
    templateUrl: './roles-view.component.html',
    styleUrls: ['./roles-view.component.css'],
    standalone: false
})
export class RolesViewComponent implements OnInit {

   title = "Roles";
  users: User;
  user: User;
  role?: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  rolesSelected:number;
  rolesForm: FormGroup;
  option_selectedd: number = 1;
    solicitud_selectedd: any = 1;

    isLoading= false;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    window.scrollTo(0,0);
  }

  getUsers(): void {
    this.isLoading= true;
    this.userService.getUsuarios().subscribe(
      res =>{
        this.users = res;
        error => this.error = error;
        this.isLoading= false;
      }
    );
  }

  cambiarRole(user: User){
    this.isLoading= true;
    this.userService.editarRole(user).subscribe(
      resp =>{ 
        this.isLoading= false;
        Swal.fire('Actualizado', `actualizado rol correctamente`, 'success');
        this.getUsers();
      }
    )
  }

   optionSelected(value: number) {
    this.option_selectedd = value;
    if (this.option_selectedd === 1) {
    }
    if (this.option_selectedd === 2) {
      this.solicitud_selectedd = null;
    }
  }

}
