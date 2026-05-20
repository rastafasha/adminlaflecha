import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: false
})
export class SearchComponent implements OnInit {


  ServerUrl = environment.apiUrl;
  usuarios:any;
  private http: HttpClient;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  search( text: string) {// funciona, devuelve la busqueda

    // return this.userService.searchUsers(text).subscribe(
    //   res=>{
    //     this.usuarios = res;
    //     console.log(this.usuarios)
    //   }
    // )



  }


}
