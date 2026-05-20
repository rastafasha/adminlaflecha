import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';
import { map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public usuario: User;

  constructor(private http: HttpClient) {}

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'SUPERADMIN' | 'ADMIN' | 'EDITOR' | 'USER' | 'MEMBER' {
    return this.usuario.role;
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  actualizarPerfil(data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/editar/${this.uid}`, data, this.headers);
  }

  update(user: User){
    return this.http.put(`${base_url}/usuarios/editar/${user}`,this.headers);
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map(
            user => new User(
              user.username,
              user.email,
              user.terminos,
              '',
              user.google,
              user.role,
              user.uid
            ));

          return {
            total: resp.total,
            usuarios

          }
        })
      )
  }

  getUserById(_id: any)  {
    const url = `${base_url}/usuarios/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuario: User}) => resp.usuario)
        );
  }
  getUsuarios()  {
    const url = `${base_url}/usuarios/all`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuarios: User}) => resp.usuarios)
      )
  }
  getRecientes()  {
    const url = `${base_url}/usuarios/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuarios: User}) => resp.usuarios)
      )
  }

  getAllEditors()  {
    const url = `${base_url}/usuarios/editores`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, editores: User}) => resp.editores)
      )
  }


  deleteById(usuario: User){
    const url = `${base_url}/usuarios/delete/${usuario}`;
    return this.http.delete(url, this.headers)
  }


  editarRole(usuario: User){
    return this.http.put(`${base_url}/usuarios/editarRole/${usuario.uid}`, usuario, this.headers);
  }


  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  searchUsers(usuario:any):Observable<any>{

    const url = `${base_url}/todo/coleccion/usuarios/${usuario}`;
    return this.http.get<any>(url, this.headers)
  }
 

}
