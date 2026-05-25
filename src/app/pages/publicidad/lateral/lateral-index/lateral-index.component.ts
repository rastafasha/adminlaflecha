import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Sideadvice } from 'src/app/models/sideadvice';
import { SideadviceService } from 'src/app/services/sideadvice.service';

@Component({
    selector: 'app-lateral-index',
    templateUrl: './lateral-index.component.html',
    styleUrls: ['./lateral-index.component.css'],
    standalone: false
})
export class LateralIndexComponent implements OnInit {

  title = "Publicidad lateral"
  sideadvices: Sideadvice;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  adSeleccionado: Sideadvice;

  constructor(
    private sideadviceService: SideadviceService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getAds();
    window.scrollTo(0,0);
  }

  getAds(): void {
    this.loading = true;
    this.sideadviceService.getBanners().subscribe(
      res =>{
        this.sideadvices = res;
        this.loading = false;
        error => this.error = error
      }
    );
  }
   PageSize() {
    this.getAds();
  }

  eliminarCurso(sideadvice:Sideadvice){

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
        this.sideadviceService.deleteBanner(sideadvice).subscribe(
          response =>{
            this.getAds();
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


  toggleStatus(sideadvice: any) {
  if (sideadvice.status === 'Activo') {
    this.desactivar(sideadvice._id);
  } else {
    this.activar(sideadvice._id);
  }
}

  desactivar(id){
    this.sideadviceService.desactivar(id).subscribe(
      response=>{
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getAds();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el archivo, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.sideadviceService.activar(id).subscribe(
      response=>{

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getAds();
      },
      error=>{
        this.msm_error = 'No se pudo activar el archivo, vuelva a intenter.'
      }
    )
  }

   onEditProject(banner: Sideadvice) {
        this.adSeleccionado = banner;
      }
    
      openEditModal(): void {
        this.adSeleccionado = null;
      }
    
      onCloseModal(): void {
        this.adSeleccionado = null;
      }
    
      onClose(){}


}
