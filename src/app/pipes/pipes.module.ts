import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { SafePipe } from './safe.pipe';
import { AdminRolesPipe } from './admin-roles.pipe';
import { UserRolePipe } from './user-role.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    EscapeHtmlPipe,
    SafePipe,
    AdminRolesPipe,
    UserRolePipe
  ],
  exports: [
    ImagenPipe,
    EscapeHtmlPipe,
    SafePipe,
    AdminRolesPipe,
    UserRolePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
