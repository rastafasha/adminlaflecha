import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  title = 'Perfil';
  imagePath: string;
  error: string;
  uploadError: boolean;

  profileSeleccionado: Profile;
  pageTitle: string;

  userProfile:User;
  profile:Profile;
  profileId: string;
  _id:string;
  uid:string;

  p: number = 1;
  count: number = 8;


  passwordForm: FormGroup;
  errors:any = null;
  infoProfile: any;

  public formSumitted = false;

  public storage = environment.apiUrlMedia

  public url;
  public user : any = {};
  public paises;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public data_paises : any = [];
  public msm_error = false;
  public msm_success = false;
  public pass_error = false;

  public usuario: User;
  public blogs: Post;

  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;

  public direcciones : Profile[];
  subcriptions: planPaypalSubcription;

  //DATA
  public new_password = '';
  public comfirm_password = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private _router : Router,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private postService: PostService,
    private subcriptionPaypalService: PlanPaypalSubcriptionService,

  ) {
    this.usuario = this.userService.usuario;
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    // this.closeMenu();
    this.getUser();
    this.validarFormularioPerfil();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
   
    // this.listar();
    
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('usuario',this.user);

  }


  getUserProfile(id:string){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error;
        console.log('usuarioServer',this.usuario)
      }
    );
    
    this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getBlogs(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserSubcription(id));

  }

  listar(id:string){
    if(!id == null || !id == undefined || id){
      this.profileService.listarUsuario(id).subscribe(
        response =>{
          this.profile = response[0];
          console.log('profileServer',this.profile);
        }
      );
    }else{
      console.log('no hay registro')
    }
    
  }

  getBlogs(_id:string){
    this.postService.getByUser(_id).subscribe(
      res =>{
        this.blogs = res;
        error => this.error = error;
        // console.log(this.blogs);
      }
    );
  }

  getUserSubcription(id:string){

    this.subcriptionPaypalService.getByUser(id).subscribe((data: any) => {
      this.subcriptions = data;
    });
  }



  iniciarFormularioPerfil(id:string){
    if (!id == null || !id == undefined || id) {
      this.profileService.getByUser(id).subscribe(
        res => {
          this.perfilForm.patchValue({
            _id: res._id,
            first_name: this.profile.first_name,
            last_name: this.profile.last_name,
            direccion: this.profile.direccion,
            pais: this.profile.pais,
            estado: this.profile.estado,
            ciudad: this.profile.ciudad,
            telhome: this.profile.telhome,
            telmovil: this.profile.telmovil,
            shortdescription: this.profile.shortdescription,
            emailPaypal: this.profile.emailPaypal,
            nombrePaypal: this.profile.nombrePaypal,
            facebook: this.profile.facebook,
            instagram: this.profile.instagram,
            twitter: this.profile.twitter,
            linkedin: this.profile.linkedin,
            usuario: this.usuario.uid,
            img: this.profile.img
          });
          this.profileSeleccionado = res;
          console.log('profileSeleccionado',this.profileSeleccionado);

        }

      );
    } else {
      this.pageTitle = 'Crear Perfil';
    }



  }

  validarFormularioPerfil(){
    this.perfilForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      pais: [''],
      estado: [''],
      ciudad: [''],
      telhome: ['', Validators.required],
      telmovil: ['', Validators.required],
      shortdescription: ['', Validators.required],
      emailPaypal: [''],
      nombrePaypal: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      // usuario: [this.usuario.uid],
      id: [''],
    });
  }

  get first_name() {
    return this.perfilForm.get('first_name');
  }

  get last_name() {
    return this.perfilForm.get('last_name');
  }

  get pais() {
    return this.perfilForm.get('pais');
  }
  get estado() {
    return this.perfilForm.get('estado');
  }
  get ciudad() {
    return this.perfilForm.get('ciudad');
  }
  get shortdescription() {
    return this.perfilForm.get('shortdescription');
  }
  get telmovil() {
    return this.perfilForm.get('telmovil');
  }
  get emailPaypal() {
    return this.perfilForm.get('emailPaypal');
  }
  get facebook() {
    return this.perfilForm.get('facebook');
  }
  get instagram() {
    return this.perfilForm.get('instagram');
  }
  get twitter() {
    return this.perfilForm.get('twitter');
  }
  get nombrePaypal() {
    return this.perfilForm.get('nombrePaypal');
  }
  get linkedin() {
    return this.perfilForm.get('linkedin');
  }
  get image() {
    return this.perfilForm.get('adicional');
  }


  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'profiles', this.profile._id)
    .then(img => { this.profile.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }



  guardarPerfil() {

    const {first_name, last_name,pais, estado,
      ciudad,telhome, telmovil, shortdescription, 
      nombrePaypal,emailPaypal,
      facebook, instagram, twitter, linkedin } = this.perfilForm.value;


    if (this.profile ) {
      const data = {
        ...this.perfilForm.value,
        _id: this.profile._id,
        usuario: this.usuario.uid,
      }
      this.profileService.updateProfile(data).subscribe(
        res => {
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
            this.ngOnInit();
        },
        error => this.errors = error
      );
    } else {
      const data = {
        ...this.perfilForm.value,
        usuario: this.usuario.uid
      }
      this.profileService.createProfile(data).subscribe(
        res => {
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.ngOnInit();
        },
        error => this.errors = error
      );
    }
    return false;
  }


  //Cambiar contraseña

iniciarFormularioPassword(uid:string){
  // const id = this.route.snapshot.paramMap.get('id');
  if (!uid == null || !uid == undefined || uid) {

    this.userService.getUserById(uid).subscribe(
      res => {
        this.passwordForm.patchValue({
          id: res.uid,
          email: res.email,
        });
      }
    );
  } else {
    this.pageTitle = 'Crear Directorio';
  }
  this.validarFormularioPassword();

}

validarFormularioPassword(){
  this.passwordForm = this.fb.group({
    id: [''],
    email: ['', Validators.required],
    password: ['', Validators.required],
  password2: ['', Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')

  });
}

passwordNoValido(){
  const pass1 = this.passwordForm.get('password').value;
  const pass2 = this.passwordForm.get('password2').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

passwordsIguales(pass1Name: string, pass2Name: string){
  return (formGroup: FormGroup) =>{
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual: true});
    }
  }
}

cambiarPassword(){
  this.formSumitted = true;
  const {name } = this.passwordForm.value;
    if(this.usuario){
      //actualizar
      const data = {
        ...this.passwordForm.value,
        id: this.usuario.uid
      }
      // this.accountService.resetPassword(data).subscribe(
      //   resp =>{
      //     Swal.fire('Cambiado', `${name}  Password Cambiado correctamente`, 'success');
      //   });
    }
  }


}
