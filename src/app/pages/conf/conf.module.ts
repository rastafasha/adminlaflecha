import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesViewComponent } from './roles/roles-view/roles-view.component';

// Import Angular plugin.
// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

// angular file uploader
// import { AngularFileUploaderModule } from 'angular-file-uploader';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { EspecIndexComponent } from './especialidades/espec-index/espec-index.component';
import { EspecEditComponent } from './especialidades/espec-edit/espec-edit.component';
import { TasabcvComponent } from './tasabcv/tasabcv.component';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    RolesViewComponent,
    CategoryEditComponent,
    CategoryIndexComponent,
    EspecIndexComponent,
    EspecEditComponent,
    TasabcvComponent

  ],
  exports: [
    ConfiguracionesComponent,
    RolesViewComponent,
    CategoryEditComponent,
    CategoryIndexComponent,
    EspecIndexComponent,
    EspecEditComponent,
    TasabcvComponent
    // PaymentmethodEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PipesModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CKEditorModule,
    ComponentsModule
    // AngularFileUploaderModule
  ]
})
export class ConfModule { }
