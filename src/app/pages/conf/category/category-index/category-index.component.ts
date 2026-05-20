import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busqueda.service';


@Component({
    selector: 'app-category-index',
    templateUrl: './category-index.component.html',
    styleUrls: ['./category-index.component.css'],
    standalone: false
})
export class CategoryIndexComponent implements OnInit {


  title = "Categorias"
  categorias: Category;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  categorySeleccionado: Category;

  query:string ='';
  info = `
  <p>En esta sección podrás:</p>
          <ul>
            <li>Crear Categorias para los Posts</li>
            <li>En esta sección podrás gestionar cada Categoria </li>
          </ul>`;

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    handler: HttpBackend,
    private busquedasService: BusquedasService,

  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    this.getCategories();
    this.getUser();
    window.scrollTo(0,0);
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  PageSize() {
    this.getCategories();
  }

  getCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categorias = res;
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
        this.categoryService.deleteCategory(_id).subscribe(
          response =>{
            this.getCategories();
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
          this.categorias = resp.categorias;
        }
      )
    }
  }

  onEditProject(category: Category) {
        this.categorySeleccionado = category;
      }
    
      openEditModal(): void {
        this.categorySeleccionado = null;
      }
    
      onCloseModal(): void {
        this.categorySeleccionado = null;
      }
    
      onClose(){}
      

}
