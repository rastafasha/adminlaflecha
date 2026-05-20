import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralIndexComponent } from './lateral/lateral-index/lateral-index.component';
import { LateralEditComponent } from './lateral/lateral-edit/lateral-edit.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    LateralIndexComponent,
    LateralEditComponent,
    PublicidadComponent
  ],
  exports: [
    LateralIndexComponent,
    LateralEditComponent,
    PublicidadComponent
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
    ComponentsModule
    // CKEditorModule,
    // AngularFileUploaderModule
  ]
})
export class PublicidadModule { }
