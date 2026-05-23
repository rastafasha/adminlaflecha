import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile, RedesSociales } from 'src/app/models/profile';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { DocumentRegistroService } from 'src/app/services/document-registro.service';
import { DocumentoRegistro } from 'src/app/models/documentoRegistro.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: false
})
export class UserProfileComponent implements OnInit {
  title = "Detalles de la cuenta";
  usuario: User;
  user: User;
  profile: Profile;
  public blogs: Post;
  error: string;
  subcriptions: planPaypalSubcription;

  public pagos: Payment[] = [];
  userPagos: Payment;
  uid: string;

  rolesSelected: number;
  documentos: DocumentoRegistro[] = [];

  p: number = 1;
  count: number = 8;
  redssociales: RedesSociales[] = [];

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private paymentService: PaymentService,
    private postService: PostService,
    private documentsRService: DocumentRegistroService,
    private activatedRoute: ActivatedRoute,
    private subcriptionPaypalService: PlanPaypalSubcriptionService,

  ) {
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.closeMenu();
    this.activatedRoute.params.subscribe(({ id }) => this.getUserRemoto(id));
    this.activatedRoute.params.subscribe(({ id }) => this.getProfile(id));
    this.activatedRoute.params.subscribe(({ id }) => this.getBlogs(id));
    this.activatedRoute.params.subscribe(({ id }) => this.getDocumentos(id));
  }

  closeMenu() {
    var menuLateral = document.getElementsByClassName("sidebar");
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("active");

    }
  }



  getUserRemoto(id) {
    this.userService.getUserById(id).subscribe(
      res => {
        this.usuario = res;
        error => this.error = error;
        // console.log(this.usuario);
      }
    );

  }

  getProfile(id: string) {

    this.profileService.getByUser(id).subscribe(
      (res:any) => {
        this.profile = res.profile;
        this.subcriptions = res.profile.subcription;
        this.pagos = res.profile.pagos;
        if (typeof res.profile.redssociales === 'string') {
            this.redssociales = JSON.parse(res.profile.redssociales);
          } else {
            this.redssociales = res.profile.redssociales || [];
          }
        error => this.error = error;
      }
    );

  }

  getUserSubcription(id: string) {

    this.subcriptionPaypalService.getByUser(id).subscribe((data: any) => {
      this.subcriptions = data;
    });
  }


  updateUser(userprofile: Profile) {
    this.profileService.updateProfile(userprofile).subscribe(
      resp => {
        console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');

      }
    )
  }

  getBlogs(_id: string) {
    this.postService.getByUser(_id).subscribe(
      res => {
        this.blogs = res;
        error => this.error = error;
        // console.log(this.blogs);
      }
    );
  }

  getDocumentos(id: string) {
    this.documentsRService.getDocumentsByUser(id).subscribe((resp:any)=>{
      this.documentos = resp;
      console.log(this.documentos);
    })
  }

   cambiarStatus(doc: DocumentoRegistro) {
      // this.isLoading= true;
      // this.documentsRService.updateStatus(user).subscribe(
      //   resp =>{ 
      //     this.isLoading= false;
      //     Swal.fire('Actualizado', `actualizado rol correctamente`, 'success');
      //     this.getUsers();
      //   }
      // )
    }
   cambiarStatusProf(profile: Profile){
      // this.isLoading= true;
      // this.documentsRService.updateStatus(user).subscribe(
      //   resp =>{ 
      //     this.isLoading= false;
      //     Swal.fire('Actualizado', `actualizado rol correctamente`, 'success');
      //     this.getUsers();
      //   }
      // )
    }
}
