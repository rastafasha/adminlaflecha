import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Sideadvice } from 'src/app/models/sideadvice';
import { SideadviceService } from 'src/app/services/sideadvice.service';
declare var bootstrap: any;
@Component({
  selector: 'app-lateral-edit',
  templateUrl: './lateral-edit.component.html',
  styleUrls: ['./lateral-edit.component.css'],
  standalone: false
})
export class LateralEditComponent implements OnInit, OnChanges {
  @Input() adSeleccionado: Sideadvice;
  @Output() refreshAdList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  public sideadviceForm: FormGroup;

  public sideadvice: Sideadvice;

  public imgSelect: String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  imagePath: string;

  title: string;
  loading: boolean = false;
  loadingImage: boolean = false;

  public user: User;
  uid: string;

  error: string;
  uploadError: string;
  currentStep = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sideadviceService: SideadviceService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fileUploadService: FileUploadService,
  ) {
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.validarFormulario();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['adSeleccionado'] &&
      changes['adSeleccionado'].currentValue
    ) {
      this.title = 'Editando Publicidad Lateral';
      const sideadvice = changes['adSeleccionado'].currentValue;
      this.sideadviceForm.patchValue({
        id: sideadvice._id,
        titulo: sideadvice.titulo,
        target: sideadvice.target,
        url: sideadvice.url,
        img: sideadvice.img,
      });
      this.adSeleccionado = sideadvice;
      this.title = 'Editando Publicidad Lateral';
    } else {
      this.title = 'Creando Publicidad Lateral';
    }
  }

  onClose() {
    this.adSeleccionado = null;
    this.adSeleccionado.img = null;
    this.currentStep = 1;
    this.sideadviceForm.reset();
    this.title = 'Creando Publicidad Lateral';
    // Also reset default values if needed
    this.sideadviceForm.patchValue({
      id: null,
      titulo: null,
      target: null,
      url: null,
      img: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }



  validarFormulario() {
    this.sideadviceForm = this.fb.group({
      titulo: ['', Validators.required],
      target: ['', Validators.required],
      url: [''],
    })
  }
  get titulo() {
    return this.sideadviceForm.get('titulo');
  }

  get target() {
    return this.sideadviceForm.get('target');
  }
  get url() {
    return this.sideadviceForm.get('url');
  }


  nextStep() {
    const titulo = this.sideadviceForm.get('titulo');
    const target = this.sideadviceForm.get('target');
    const url = this.sideadviceForm.get('url');

    if (titulo?.invalid ||
      target?.invalid ||
      url?.invalid

    ) {
      titulo?.markAsTouched();
      target?.markAsTouched();
      url?.markAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  prevStep() {
    this.currentStep = 1;
  }



  editCurso() {

     if (!this.sideadviceForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.sideadviceForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const formData = new FormData();
    formData.append('titulo', this.sideadviceForm.get('titulo').value);
    formData.append('target', this.sideadviceForm.get('target').value);
    formData.append('url', this.sideadviceForm.get('url').value);


    if (this.adSeleccionado) {
      //actualizar
      const data = {
        ...this.sideadviceForm.value,
        _id: this.adSeleccionado._id
      }

      this.sideadviceService.updateBanner(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editAd');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();

          }
          // Emit event to refresh project list
          this.refreshAdList.emit();
          this.ngOnInit()
        });

    } else {
      //crear
      const data = {
        ...this.sideadviceForm.value
      }
      this.sideadviceService.createBanner(data).subscribe(
        (resp: any) => {
          this.adSeleccionado = resp.sideadvice
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
      .actualizarFoto(this.imagenSubir, 'sideadvertisings', this.adSeleccionado._id)
      .then(img => {
        this.adSeleccionado.img = img;
        this.loadingImage = false;
        Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
        this.refreshAdList.emit();
        this.onClose();

      }).catch(err => {
        this.loadingImage = false;
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');

      })
  }



}
