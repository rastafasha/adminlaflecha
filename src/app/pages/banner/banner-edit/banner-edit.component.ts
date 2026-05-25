import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
declare var bootstrap: any;
@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css'],
  standalone: false
})
export class BannerEditComponent implements OnInit, OnChanges {
  @Input() bannerSeleccionado: Banner;
  @Output() refreshBannerList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  /**
  * Editor type area wyswyg
  */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;

  public bannerForm: FormGroup;
  public banner: Banner;
  loading: boolean = false;
  loadingImage: boolean = false;
  public imgSelect: String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  imagePath: string;
  title: string;
  public user: User;
  uid: string;
  error: string;
  uploadError: string;
  public storage = environment.apiUrlMedia
  currentStep = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bannerService: BannerService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private fileUploadService: FileUploadService,
  ) {
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    this.validarFormulario();
    this.getUser();
    window.scrollTo(0, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['bannerSeleccionado'] &&
      changes['bannerSeleccionado'].currentValue
    ) {
      this.title = 'Editando Banner';
      const banner = changes['bannerSeleccionado'].currentValue;
      this.bannerForm.patchValue({
        id: banner._id,
        titulo: banner.titulo,
        target: banner.target,
        gotBoton: banner.gotBoton,
        botonName: banner.botonName,
        url: banner.url,
        color: banner.color,
        colortext: banner.colortext,
        colortextboton: banner.colortextboton,
        img: banner.img,
        description: banner.description,
      });
      this.bannerSeleccionado = banner;
      this.title = 'Editando Banner';
    } else {
      this.title = 'Creando Banner';
    }
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
  }

  onClose() {
    this.bannerSeleccionado = null;
    this.currentStep = 1;
    this.bannerForm.reset();
    this.title = 'Creando Proyecto';
    // Also reset default values if needed
    this.bannerForm.patchValue({
      id: null,
      titulo: null,
      target: null,
      gotBoton: null,
      botonName: null,
      url: null,
      color: null,
      colortext: null,
      colortextboton: null,
      img: null,
      description: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }



  validarFormulario() {
    this.bannerForm = this.fb.group({
      titulo: ['', Validators.required],
      description: [''],
      target: ['', Validators.required],
      gotBoton: ['', Validators.required],
      botonName: [''],
      url: [''],
      color: [''],
      colortext: [''],
      colortextboton: [''],
    })
  }
  get titulo() {
    return this.bannerForm.get('titulo');
  }

  get description() {
    return this.bannerForm.get('description');
  }
  get target() {
    return this.bannerForm.get('target');
  }
  get gotBoton() {
    return this.bannerForm.get('gotBoton');
  }

  get botonName() {
    return this.bannerForm.get('botonName');
  }
  get color() {
    return this.bannerForm.get('color');
  }
  get colortext() {
    return this.bannerForm.get('colortext');
  }
  get colortextboton() {
    return this.bannerForm.get('colortextboton');
  }
  get url() {
    return this.bannerForm.get('url');
  }

  nextStep() {
    const titulo = this.bannerForm.get('titulo');
    const description = this.bannerForm.get('description');
    const target = this.bannerForm.get('target');
    const gotBoton = this.bannerForm.get('gotBoton');
    const botonName = this.bannerForm.get('botonName');
    const color = this.bannerForm.get('color');
    const colortext = this.bannerForm.get('colortext');
    const colortextboton = this.bannerForm.get('colortextboton');
    const url = this.bannerForm.get('url');

    if (titulo?.invalid || description?.invalid ||
      target?.invalid || gotBoton?.invalid ||
      botonName?.invalid || color?.invalid ||
      colortext?.invalid || colortextboton?.invalid || 
      url?.invalid

    ) {
      titulo?.markAsTouched();
      description?.markAsTouched();
      target?.markAsTouched();
      gotBoton?.markAsTouched();
      botonName?.markAsTouched();
      color?.markAsTouched();
      colortext?.markAsTouched();
      colortextboton?.markAsTouched();
      url?.markAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  prevStep() {
    this.currentStep = 1;
  }

  editCurso() {

    if (!this.bannerForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.bannerForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const formData = new FormData();
    formData.append('titulo', this.bannerForm.get('titulo').value);
    formData.append('target', this.bannerForm.get('target').value);
    formData.append('gotBoton', this.bannerForm.get('gotBoton').value);
    formData.append('botonName', this.bannerForm.get('botonName').value);
    formData.append('description', this.bannerForm.get('description').value);
    formData.append('url', this.bannerForm.get('url').value);
    formData.append('color', this.bannerForm.get('color').value);
    formData.append('colortext', this.bannerForm.get('colortext').value);
    formData.append('colortextboton', this.bannerForm.get('colortextboton').value);


    if (this.bannerSeleccionado) {
      //actualizar
      const data = {
        ...this.bannerForm.value,
        _id: this.bannerSeleccionado._id
      }

      this.bannerService.updateBanner(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editBanner');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();

          }
          // Emit event to refresh project list
          this.refreshBannerList.emit();
          this.ngOnInit()
        });

    } else {
      //crear
      const data = {
        ...this.bannerForm.value
      }
      this.bannerService.createBanner(data).subscribe(
        (resp: any) => {
          this.bannerSeleccionado = resp.banner;

          Swal.fire('¡Paso 1 completado!', 'Post creado. Ahora sube la imagen.', 'success');
          // Como estmos creando, al finalizar debe ir al paso 2 para subir la imagen
          this.currentStep = 2;
        });
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

  subirImagen() {
    this.loadingImage = true;
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'banners', this.bannerSeleccionado._id)
      .then(img => {
        this.bannerSeleccionado.img = img;
        this.loadingImage = false;
        Swal.fire('Listo', 'Imagen subida correctamente', 'success');
        // Aquí ya puedes cerrar el modal o refrescar la lista
        this.refreshBannerList.emit();
        this.onClose();
      }).catch(err => {
        this.loadingImage = false;
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');

      })
  }


  //ckeditor

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );


  }


}
