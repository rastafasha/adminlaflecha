import { environment } from "src/environments/environment";
import { Post } from "./post";
import { User } from "./user";
import { Speciality } from "./speciality.model";
import { Pais } from "./pais";
const base_url = environment.apiUrlMedia;
export class Profile {
  constructor(
    public first_name: string,
    public last_name: string,
    public n_doc: string,
    public num_inpre: string,
    public gender: number,
    public pais: Pais,
    public ciudad: string,
    public lang: string,
    public telhome: string,
    public telmovil: string,
    public direccion: string,
    public shortdescription: string,
    public redssociales: RedesSociales,
    public plan: string,
    public fechaReinicio: Date,
    public paypalSubscriptionId: string,
    // public subcription: subcriptionPaypal[] = [],
    public createdAt: Date,
    public updatedAt: Date,
    public rating?:number,
    public status?: 'PENDING' | 'REVIEW' | 'VERIFIED',
    public articulosVistos?: number,
    public usuario?: User,
    // public blog?: Post,
    public especialidad?: Speciality,
    public img?: string,
    public _id?: string

){}



  get imagenUrl(){

    if(!this.img){
      return `${base_url}/profiles/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/profiles/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}

export class RedesSociales{
  constructor(
    public index?: string,
    public name_red?: string,
    public icono?: string,
    public usuario_red?: string,
  ){}
}
