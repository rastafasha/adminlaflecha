import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
  standalone: false
})
export class HeaderComponent implements OnInit {

  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado
  userprofile!: any;
  user: any;
  error: string;
  id: any;
  profile: Profile;
  user_id: string

  constructor(
    private usuarioService: UserService,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
  ) {
     this.user = authService.getLocalStorage();
  }



  ngOnInit() {
    
    if (!this.user || !this.user.uid || this.user.uid == null || this.user.uid == undefined) {
      this.router.navigateByUrl('/login');
    } else {
      this.id = this.user.uid;
      this.getProfile();
    }

    if (localStorage.getItem('dark')) {
      this.darkmode('dark');
    }
  }

  getUserServer() {
    this.usuarioService.getUserById(this.user_id).subscribe(
      res => {
        this.user = res;
        error => this.error = error
      }
    );

  }

  getProfile() {
    this.profileService.listarUsuario(this.user_id).subscribe(
      response => {
        this.profile = response;
      }
    );

  }

  openModal() {
    var modalcart = document.getElementsByClassName("dropdown-menu");
    for (var i = 0; i < modalcart.length; i++) {
      modalcart[i].classList.toggle("show");
    }
  }


  openMenu() {
    var menuLateral = document.getElementsByClassName("mini-sidebar");
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.toggle("show-sidebar");
    }
  }

  logout() {
    this.authService.logout();
  }

  darkmode(dark: string) {
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName(
      'dark'
    ).length > 0;

    var dayNight = document.getElementsByClassName("dayNight");
    for (var i = 0; i < dayNight.length; i++) {
      dayNight[i].classList.toggle("active");
      body.classList.toggle('dark');
      header.classList.toggle('dark');
      aside.classList.toggle('dark');

    }
    // localStorage.setItem('dark', dark);

    if (classExists) {
      localStorage.removeItem('dark');
      // console.log('✅ class exists on page, removido');
    } else {
      localStorage.setItem('dark', dark);
      // console.log('⛔️ class does NOT exist on page, agregado');
    }
    // console.log('Pulsado');
  }





}
