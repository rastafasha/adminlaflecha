import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalsubcriptionEditComponent } from './paypalsubcription-edit/paypalsubcription-edit.component';
import { PaypalsubcriptionIndexComponent } from './paypalsubcription-index/paypalsubcription-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SubcriptionsComponent } from './subcriptions/subcriptions.component';
import { SubcriptionComponent } from './subcription/subcription.component';
import { PaypalhomeComponent } from './paypalhome/paypalhome.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    PaypalsubcriptionEditComponent,
    PaypalsubcriptionIndexComponent,
    SubcriptionsComponent,
    SubcriptionComponent,
    PaypalhomeComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  exports: [
    PaypalsubcriptionEditComponent,
    PaypalsubcriptionIndexComponent,
    SubcriptionsComponent,
    SubcriptionComponent,
    PaypalhomeComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    NgxPaginationModule,
    ComponentsModule
  ]
})
export class PaypalsubcriptionModule { }
