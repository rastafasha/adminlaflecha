import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Speciality } from 'src/app/models/speciality.model';
import { User } from 'src/app/models/user';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import Swal from 'sweetalert2';
import { EspecEditComponent } from "../espec-edit/espec-edit.component";
import { ModalInstruccionesComponent } from 'src/app/components/modal-instrucciones/modal-instrucciones.component';

@Component({
  selector: 'app-espec-index',
  templateUrl: './espec-index.component.html',
  styleUrl: './espec-index.component.css',
  standalone: false
})
export class EspecIndexComponent {


    title = "Especialidades"
    specialities: Speciality;
    user: User;
    p: number = 1;
    count: number = 8;
    error: string;
    msm_error: string;
    loading = false;
    especSeleccionado: Speciality;
  
    query:string ='';
    info = `
    <p>En esta sección podrás:</p>
            <ul>
              <li>Crear Categorias para los Posts</li>
              <li>En esta sección podrás gestionar cada Categoria </li>
            </ul>`;
  
    constructor(
      private http: HttpClient,
      private specialityService: SpecialitiesService,
      handler: HttpBackend,
      private busquedasService: BusquedasService,
  
    ) {
      this.http = new HttpClient(handler);
     }
  
    ngOnInit(): void {
      this.getEspecialidades();
      this.getUser();
      window.scrollTo(0,0);
    }
  
    getUser(): void {
  
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  
    PageSize() {
      this.getEspecialidades();
    }
  
    getEspecialidades(): void {
      this.loading = true;
      this.specialityService.getSpecialitys().subscribe(
        (res:any) =>{
          this.specialities = res;
          error => this.error = error;
          this.loading = false;
        }
      );
    }
  
    eliminarCategory(_id:string){
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
          this.specialityService.deletespeciality(_id).subscribe(
            response =>{
              this.getEspecialidades();
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
  
    search(): void {
      if(!this.query){
        this.ngOnInit();
      }else{
       this.busquedasService.searchGlobal(this.query).subscribe(
          (resp:any) => {
            this.specialities = resp.specialities;
          }
        )
      }
    }
  
    onEditProject(speciality: Speciality) {
          this.especSeleccionado = speciality;
        }
      
        openEditModal(): void {
          this.especSeleccionado = null;
        }
      
        onCloseModal(): void {
          this.especSeleccionado = null;
        }
      
        onClose(){}

}
