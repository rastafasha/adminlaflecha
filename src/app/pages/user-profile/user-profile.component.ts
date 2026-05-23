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
import { AuthService } from 'src/app/services/auth.service';

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

  isLoadingDoc = false;
  isLoading = false;

  p: number = 1;
  count: number = 8;
  redssociales: RedesSociales[] = [];
  docSeleccionado: DocumentoRegistro;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private postService: PostService,
    private documentsRService: DocumentRegistroService,
    private activatedRoute: ActivatedRoute,
    private subcriptionPaypalService: PlanPaypalSubcriptionService,

  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
    this.activatedRoute.params.subscribe(({ id }) => this.getProfile(id));
    this.activatedRoute.params.subscribe(({ id }) => this.getBlogs(id));
    this.activatedRoute.params.subscribe(({ id }) => this.getDocumentos(id));
  }

  

  getProfile(id: string) {
    this.profileService.getByUser(id).subscribe(
      (res: any) => {
        this.profile = res.profile;
        this.usuario = res.profile.usuario;
        console.log(res)
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
    this.isLoadingDoc = true;
    this.documentsRService.getDocumentsByUser(id).subscribe((resp: any) => {
      this.documentos = resp;
      this.isLoadingDoc = false;
    })
  }

  cambiarStatus(data: any) {
    const nuevoEstado = data.status;
    const id = data._id;

    // 1. Caso: RECHAZADO (Pide motivo)
    if (nuevoEstado === 'REFUSED') {
      Swal.fire({
        title: 'Motivo del Rechazo',
        input: 'text',
        inputPlaceholder: 'Ej: Capture borroso, monto incompleto...',
        showCancelButton: true,
        confirmButtonText: 'Rechazar y Notificar',
        confirmButtonColor: '#d33', // Rojo para peligro
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) return '¡Debes escribir un motivo para el usuario!';
          return null;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.ejecutarUpdateStatus(id, nuevoEstado, result.value);
        } else {
          this.ngOnInit(); // Revierte el select si cancela
        }
      });

    // 2. Caso: APROBADO (Confirmación de seguridad)
    } else if (nuevoEstado === 'APROVED') {
      Swal.fire({
        title: '¿Confirmar Aprobación?',
        text: `¿Estás seguro de marcar como APROBADO el documento de ${data.tipoDoc}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, Aprobar',
        confirmButtonColor: '#198754', // Verde para éxito
        cancelButtonText: 'No, revisar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ejecutarUpdateStatus(id, nuevoEstado);
        } else {
          this.ngOnInit(); // Revierte el select si se arrepiente
        }
      });

    } else {
      // 3. Caso: PENDIENTE (Cambio directo)
      this.ejecutarUpdateStatus(id, nuevoEstado);
    }
}

// Función auxiliar para no repetir código del subscribe
private ejecutarUpdateStatus(id: string, nuevoEstado: string, observaciones: string = '') {
    const payload = {
      status: nuevoEstado,
      observaciones: observaciones // Esto llegará a tu backend para el mensaje del Push/Toastr
    };

    this.documentsRService.updateStatus(payload, id).subscribe({
      next: (resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: nuevoEstado === 'APROVED' ? '✅ Documento Aprobado' : '❌ Documento Rechazado',
          color: 'gray',
          showConfirmButton: false,
          timer: 1500,
        });
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el pago', 'error');
        this.ngOnInit();
      }
    });
}

  cambiarStatusProf(profile: Profile) {
    this.isLoading= true;
    const data ={
      status: profile.status
    }
    this.profileService.updateStatus(data, profile._id).subscribe(
      resp =>{ 
        this.isLoading= false;
        Swal.fire('Actualizado', `actualizado rol correctamente`, 'success');
        this.ngOnInit();
      }
    )
  }

  onEditProject(doc: DocumentoRegistro) {
    this.docSeleccionado = doc;
  }

  onCloseModal(): void {
    this.docSeleccionado = null;
  }
  onClose(){}

}
