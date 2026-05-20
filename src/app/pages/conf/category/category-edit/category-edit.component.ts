import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
declare var bootstrap: any;

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  standalone: false
})
export class CategoryEditComponent implements OnInit, OnChanges {
  @Input() categorySeleccionado: Category;
  @Output() refreshCatList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  title: string;
  public categoryForm: FormGroup;
  public category: Category;
  public usuario: User;
  error: string;
  idcategory: any;
  public msm_error = '';
  currentStep = 1;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.validarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['categorySeleccionado'] &&
      changes['categorySeleccionado'].currentValue
    ) {
      this.title = 'Editando Categoría';
      const category = changes['categorySeleccionado'].currentValue;
      this.categoryForm.patchValue({
        id: category._id,
        nombre: category.nombre,
      });
      this.categorySeleccionado = category;
      this.title = 'Editando Categoría';
    } else {
      this.title = 'Creando Categoría';
    }
  }

  onClose() {
    this.categorySeleccionado = null;
    this.categoryForm.reset();
    this.title = 'Creando Categoría';
    // Also reset default values if needed
    this.categoryForm.patchValue({
      id: null,
      nombre: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }

  validarFormulario() {
    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
    })
  }

  updateCategory() {
    if (!this.categoryForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.categoryForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const { nombre } = this.categoryForm.value;

    if (this.categorySeleccionado) {
      //actualizar
      const data = {
        ...this.categoryForm.value,
        _id: this.categorySeleccionado._id
      }
      this.categoryService.updateCategory(data).subscribe(
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
      this.categoryService.createCategory(this.categoryForm.value)
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
