import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

      if(this.authService.role === 'ADMIN' ) {
        return true;
      }if(this.authService.role === 'SUPERADMIN' ) {
        return true;
      }if(this.authService.role === 'EDITOR' ) {
        return true;
      }else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }

}
