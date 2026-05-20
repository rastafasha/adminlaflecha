import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
//ckeditor
import * as Decoupled from '@ckeditor/ckeditor5-build-decoupled-document';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
declare var bootstrap: any;
@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  standalone: false
})
export class PostEditComponent implements OnInit, OnChanges {

  @Input() postSeleccionado;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshPostList: EventEmitter<void> = new EventEmitter<void>();
  // public Editor = ClassicEditor;
  public Editor = Decoupled;
  public Editor1 = Decoupled;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;

  public isLoading: boolean = false;
  public isLoadingImage: boolean = false;
  public postForm: FormGroup;

  public post: Post;
  public categorias: Category;

  public imgSelect: String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  public imagePath: string;

  public msm_error = '';
  public user: User;
  public categories: Category;
  public title: string;
  public uid: string;

  publicerror: string;
  public uploadError: string;

  currentStep = 1;


  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private fileUploadService: FileUploadService,

  ) {
    this.user = userService.usuario;
  }

  ngOnInit(): void {
    this.validarFormulario();
    this.getCategories();
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categorias = res;
      }
    );
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['postSeleccionado'] &&
      changes['postSeleccionado'].currentValue
    ) {
      this.title = 'Editando Post';
      const post = changes['postSeleccionado'].currentValue;
      this.postForm.patchValue({
        id: post._id,
        name: post.name,
        price: post.price,
        description: post.description,
        adicional: post.adicional,
        introhome: post.introhome,
        slug: post.slug,
        categoria: post.categoria._id,
        status: post.status,
        isFeatured: post.isFeatured,
        img: post.img,
        usuario: this.user.uid,
      });
      this.postSeleccionado = post;
      this.title = 'Editando Proyecto';
    } else {
      this.title = 'Creando Post';
    }
  }


  onClose() {
    this.postSeleccionado = null;
    this.currentStep = 1;
    this.postForm.reset();
    this.title = 'Creando Proyecto';
    // Also reset default values if needed
    this.postForm.patchValue({
      id: null,
      name: null,
      price: null,
      description: null,
      adicional: null,
      introhome: null,
      slug: null,
      categoria: null,
      status: null,
      isFeatured: null,
      img: null,
      usuario: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }

  validarFormulario() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      price: [''],
      description: [''],
      adicional: [''],
      introhome: [''],
      slug: [''],
      isFeatured: [''],
      categoria: [''],
      // usuario: [this.usuario.uid],
    })
  }
  get name() {
    return this.postForm.get('name');
  }

  get description() {
    return this.postForm.get('description');
  }
  get slug() {
    return this.postForm.get('slug');
  }

  get categoria() {
    return this.postForm.get('categoria');
  }
  get price() {
    return this.postForm.get('price');
  }
  get isFeatured() {
    return this.postForm.get('isFeatured');
  }
  get adicional() {
    return this.postForm.get('adicional');
  }
  get introhome() {
    return this.postForm.get('introhome');
  }
  get usuario() {
    return this.postForm.get('usuario');
  }

  nextStep() {
    const name = this.postForm.get('name');
    const description = this.postForm.get('description');
    const categoria = this.postForm.get('categoria');
    const price = this.postForm.get('price');
    const isFeatured = this.postForm.get('isFeatured');
    const adicional = this.postForm.get('adicional');
    const introhome = this.postForm.get('introhome');

    if (name?.invalid || description?.invalid ||
      categoria?.invalid || price?.invalid ||
      isFeatured?.invalid || adicional?.invalid ||
      introhome?.invalid

    ) {
      name?.markAsTouched();
      description?.markAsTouched();
      categoria?.markAsTouched();
      price?.markAsTouched();
      isFeatured?.markAsTouched();
      adicional?.markAsTouched();
      introhome?.markAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  prevStep() {
    this.currentStep = 1;
  }


  editPost() {

    if (!this.postForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.postForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const formData = new FormData();
    formData.append('name', this.postForm.get('name').value);
    formData.append('price', this.postForm.get('price').value);
    formData.append('description', this.postForm.get('description').value);
    formData.append('categoria', this.postForm.get('categoria').value);
    formData.append('isFeatured', this.postForm.get('isFeatured').value);
    formData.append('adicional', this.postForm.get('adicional').value);
    formData.append('introhome', this.postForm.get('introhome').value);

    if (this.postSeleccionado) {
      //actualizar
      const data = {
        ...this.postForm.value,
        _id: this.postSeleccionado._id,
        // usuario: this.user.uid
      }

      this.postService.updatePost(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');

          // Close modal programmatically
          const modalElement = document.getElementById('editPost');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();

          }
          // Emit event to refresh project list
          this.refreshPostList.emit();
          this.ngOnInit()
        });

    } else {
      //crear
      const data = {
        ...this.postForm.value,
        // user_id: this.user.uid
      }
      this.postService.createPost(data).subscribe(
        (resp: any) => {
          console.log('Respuesta completa del servidor:', resp);
          // Si la respuesta es directamente el post:
          this.postSeleccionado = resp.blog;

          Swal.fire('¡Paso 1 completado!', 'Post creado. Ahora sube la imagen.', 'success');
          // Como estmos creando, al finalizar debe ir al paso 2 para subir la imagen
          this.currentStep = 2;
        },
        err => {
          Swal.fire('Error', 'No se pudo crear el post', 'error');
        })
    }
  }


  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(): void {
    if (!this.imagenSubir) {
      Swal.fire('Atención', 'Selecciona una imagen primero', 'warning');
    }

    this.isLoadingImage = true;

    // Usamos el ID que se guardó al crear el post
    const id = this.postSeleccionado._id;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'blogs', id)
      .then(img => {
        this.postSeleccionado.img = img;
        this.isLoadingImage = false;
        Swal.fire('Listo', 'Imagen subida correctamente', 'success');

        // Aquí ya puedes cerrar el modal o refrescar la lista
        this.refreshPostList.emit();
        this.onClose();
      })
      .catch(err => {
        this.isLoadingImage = false;
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });

  }

  //ckeditor

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }






}
