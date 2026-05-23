import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';

//modulos
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';


import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HelpComponent } from './help/help.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { PostIndexComponent } from './posts/post-index/post-index.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
import { BannerIndexComponent } from './banner/banner-index/banner-index.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PaypalsubcriptionModule } from './paypalsubcription/paypalsubcription.module';
import { PublicidadModule } from './publicidad/publicidad.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewDocComponent } from './user-profile/view-doc/view-doc.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    UserProfileComponent,
    PostIndexComponent,
    PostEditComponent,
    BannerEditComponent,
    BannerIndexComponent,
    BusquedaComponent,
    ViewDocComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    ProfileComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    UserProfileComponent,
    PostIndexComponent,
    PostEditComponent,
    BannerEditComponent,
    BannerIndexComponent,
    BusquedaComponent,
    ViewDocComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    PaypalsubcriptionModule,
    PublicidadModule,
    // CursosModule,
    NgxPaginationModule,
    CKEditorModule,
    SharedModule
],
  providers: [
  ],
})
export class PagesModule { }
