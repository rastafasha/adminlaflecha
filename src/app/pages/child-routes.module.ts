import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionesComponent } from './conf/configuraciones/configuraciones.component';
import { RolesViewComponent } from './conf/roles/roles-view/roles-view.component';
import { ContactComponent } from './contact/contact.component';

//pages
import { DashboardComponent } from './dashboard/dashboard.component';

import { HelpComponent } from './help/help.component';
import { PaymentsComponent } from './payments/payments.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryIndexComponent } from './conf/category/category-index/category-index.component';
import { PostIndexComponent } from './posts/post-index/post-index.component';
import { BannerIndexComponent } from './banner/banner-index/banner-index.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PaypalsubcriptionIndexComponent } from './paypalsubcription/paypalsubcription-index/paypalsubcription-index.component';
import { PaypalhomeComponent } from './paypalsubcription/paypalhome/paypalhome.component';
import { SubcriptionsComponent } from './paypalsubcription/subcriptions/subcriptions.component';
import { SubcriptionComponent } from './paypalsubcription/subcription/subcription.component';
import { PublicidadComponent } from './publicidad/publicidad/publicidad.component';
import { LateralIndexComponent } from './publicidad/lateral/lateral-index/lateral-index.component';
import { ProductListComponent } from './paypalsubcription/products/product-list/product-list.component';
import { EspecIndexComponent } from './conf/especialidades/espec-index/espec-index.component';
import { TasabcvComponent } from './conf/tasabcv/tasabcv.component';




const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth

    //configuraciones
    { path: 'configuraciones',  component: ConfiguracionesComponent, data:{title:'Configuraciones'} },
    { path: 'buscar', component: BusquedaComponent, data:{tituloPage:'Busquedas'} },
    { path: 'buscar/:termino', component: BusquedaComponent, data:{tituloPage:'Busquedas'} },
    { path: 'rolesconf', component: RolesViewComponent, data:{title:'Planes'} },
    { path: 'tasaBCV', component: TasabcvComponent, data:{title:'Tasa BCV'} },

    { path: 'categories', component: CategoryIndexComponent, data:{title:'Categoria'} },
    { path: 'especialidades', component: EspecIndexComponent, data:{title:'Especialidades'} },
    
    { path: 'products', component: ProductListComponent, data:{title:'paypal-subcription'} },
    
    { path: 'paypal-subcription-home', component: PaypalhomeComponent, data:{title:'paypal-subcription'} },
    { path: 'paypal-plans', component: PaypalsubcriptionIndexComponent, data:{title:'paypal-subcription'} },

  
    // 2. Al final las rutas con parámetros genéricos (:id)
    { path: 'paypal-plan/:id', component: PaypalsubcriptionIndexComponent, data:{title:'paypal-subcription'} },
    { path: 'paypal-subcriptions', component: SubcriptionsComponent, data:{title:'Editar paypal-subcription'} },
    { path: 'paypal-subcription/:id', component: SubcriptionComponent, data:{title:'paypal-subcription'} },


    // posts
    { path: 'posts', component: PostIndexComponent, data:{title:'Blog'} },
    { path: 'post/:id', component: PostIndexComponent, data:{title:'Blog'} },

    //banner
    { path: 'banners', component: BannerIndexComponent, data:{title:'Banners'} },

    //admin
    { path: 'compras',   component: PaymentsComponent, data:{title:'Pagos'} },

    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },

    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    //publicidad
    { path: 'publicidad', component: PublicidadComponent, data:{title:'publicidad'} },
    { path: 'publicidad-lateral', component: LateralIndexComponent, data:{title:'publicidad'} },
    
    { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
    { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },
    

    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },





]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
