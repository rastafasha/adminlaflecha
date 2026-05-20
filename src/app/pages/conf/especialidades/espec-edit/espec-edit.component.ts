import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Speciality } from 'src/app/models/speciality.model';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-espec-edit',
  standalone: false,
  templateUrl: './espec-edit.component.html',
  styleUrl: './espec-edit.component.css'
})
export class EspecEditComponent {

   @Input() especSeleccionado: Speciality;
  @Output() refreshCatList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  title: string;
  public specialityForm: FormGroup;
  public category: Speciality;
  public usuario: User;
  error: string;
  idcategory: any;
  public msm_error = '';
  currentStep = 1;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private specialityService: SpecialitiesService,
  ) {
    this.usuario = authService.getLocalStorage();
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.validarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['especSeleccionado'] &&
      changes['especSeleccionado'].currentValue
    ) {
      this.title = 'Editando Categoría';
      const speciality = changes['especSeleccionado'].currentValue;
      this.specialityForm.patchValue({
        id: speciality._id,
        nombre: speciality.nombre,
      });
      this.especSeleccionado = speciality;
      this.title = 'Editando Categoría';
    } else {
      this.title = 'Creando Categoría';
    }
  }

  onClose() {
    this.especSeleccionado = null;
    this.specialityForm.reset();
    this.title = 'Creando Categoría';
    // Also reset default values if needed
    this.specialityForm.patchValue({
      id: null,
      nombre: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }

  validarFormulario() {
    this.specialityForm = this.fb.group({
      nombre: ['', Validators.required],
    })
  }

  updateCategory() {
    if (!this.specialityForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.specialityForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const { nombre } = this.specialityForm.value;

    if (this.especSeleccionado) {
      //actualizar
      const data = {
        ...this.specialityForm.value,
        _id: this.especSeleccionado._id
      }
      this.specialityService.updatespeciality(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `${nombre}  actualizado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editCategory');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();

          }
          // Emit event to refresh project list
          this.refreshCatList.emit();
          this.ngOnInit()
        });

    } else {
      //crear
      this.specialityService.createspeciality(this.specialityForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editCategory');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();

          }
          // Emit event to refresh project list
          this.refreshCatList.emit();
          this.ngOnInit()
        })
    }

  }

}
