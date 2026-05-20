import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styles: [],
    standalone: false
})

export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  public user: User;

  error: string;
  id: any;
  roleid:number;

  constructor(
    private authService: AuthService,
  ) {
    this.user = authService.getLocalStorage();
   }

  ngOnInit(): void {
  }

  toggleNav(){
    this.sidenav.toggle();
  }

  logout(): void {
    this.authService.logout();
  }

}
