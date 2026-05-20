import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busqueda.service';


@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css'],
  standalone: false
})
export class PostIndexComponent implements OnInit {

  title = "Publicaciones"
  blogs: Post;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  publicaciones: any;
  selectedProject:Post;
  postSeleccionado:Post;

  query: string = '';

   info = `
  <p>En esta sección podrás:</p>
          <ul>
            <li>Crear Post Para el blog</li>
            <li>En esta sección Post podrás gestionar cada Post </li>
          </ul>`;

  constructor(
    private postService: PostService,
    handler: HttpBackend,
    private busquedasService: BusquedasService,
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
    window.scrollTo(0, 0);
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.loading = true;
    this.postService.getPosts().subscribe(
      res => {
        this.blogs = res;
        error => this.error = error;
        this.loading = false;
      }
    );
  }

  PageSize() {
    this.getPosts();
  }

  eliminarPost(post: Post) {
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
        this.postService.deletePost(post).subscribe(
          response => {
            this.getPosts();
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

  // cambiarStatus(post:Post){
  //   this.postService.activar(post).subscribe(
  //     resp =>{ console.log(resp);
  //       Swal.fire('Actualizado', `actualizado correctamente`, 'success');
  //       this.getPosts();
  //     }
  //   )
  // }

  toggleStatus(blog: any) {
  if (blog.status === 'Activo') {
    this.desactivar(blog._id);
  } else {
    this.activar(blog._id);
  }
}
  
  desactivar(id) {
    this.postService.desactivar(id).subscribe(
      response => {
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getPosts();
      },
      error => {
        this.msm_error = 'No se pudo desactivar el producto, vuelva a intenter.'
      }
    )
  }

  activar(id) {
    this.postService.activar(id).subscribe(
      response => {
        Swal.fire('Actualizado', `activado correctamente`, 'success');
        this.getPosts();
      },
      error => {
        this.msm_error = 'No se pudo activar el producto, vuelva a intenter.'
      }
    )
  }

  search(): void {
    if (!this.query) {
      this.ngOnInit();
    } else {
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp: any) => {
          this.blogs = resp.blogs;

        }
      )
    }
  }
  onEditProject(post: Post) {
    this.postSeleccionado = post;
  }

  openEditModal(): void {
    this.postSeleccionado = null;
  }

  onCloseModal(): void {
    this.postSeleccionado = null;
  }

  onClose(){}
  

}
