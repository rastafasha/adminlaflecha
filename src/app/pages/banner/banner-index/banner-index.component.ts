import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';

@Component({
    selector: 'app-banner-index',
    templateUrl: './banner-index.component.html',
    styleUrls: ['./banner-index.component.css'],
    standalone: false
})
export class BannerIndexComponent implements OnInit {

  title = "Banner Home"
  banners: Banner;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  bannerSeleccionado: Banner;

  info = `
  <p>En esta sección podrás:</p>
          <ul>
            <li>Crear Banners principales</li>
            <li>En esta sección Banners podrás gestionar cada Banners </li>
          </ul>`;

  constructor(
    private bannerService: BannerService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getBanners();
    window.scrollTo(0,0);
  }

  getBanners(): void {
    this.loading = true;
    this.bannerService.getBanners().subscribe(
      res =>{
        this.banners = res;
        error => this.error = error
        this.loading = false;
      }
    );
  }

  PageSize() {
    this.getBanners();
  }

  eliminarCurso(banner:Banner){

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
        this.bannerService.deleteBanner(banner).subscribe(
          response =>{
            this.getBanners();
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

  toggleStatus(banner: any) {
  if (banner.status === 'Activo') {
    this.desactivar(banner._id);
  } else {
    this.activar(banner._id);
  }
}

  desactivar(id){
    this.bannerService.desactivar(id).subscribe(
      response=>{
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getBanners();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.bannerService.activar(id).subscribe(
      response=>{

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getBanners();
      },
      error=>{
        this.msm_error = 'No se pudo activar el curso, vuelva a intenter.'
      }
    )
  }

  onEditProject(banner: Banner) {
      this.bannerSeleccionado = banner;
    }
  
    openEditModal(): void {
      this.bannerSeleccionado = null;
    }
  
    onCloseModal(): void {
      this.bannerSeleccionado = null;
    }
  
    onClose(){}
    

}
