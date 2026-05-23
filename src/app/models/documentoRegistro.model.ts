import { environment } from "../../environments/environment";
import { User } from "./user";

const base_url = environment.apiUrlMedia;
export class DocumentoRegistro {
    _id?: string;
      size!: string;
      resolution!: string;
      file!: string;
      type!: string;
      observaciones!: string;
       status?: 'PENDING' | 'APROVED' | 'REFUSED';
       tipoDoc!: string;
      usuario!: User;
      createdAt!: Date;
      updatedAt!: Date;
  
    get imagenUrl(){

    if(!this.file){
      return `assets/images/no-image.jpg`;
    } else if(this.file.includes('https')){
      return this.file;
    } else if(this.file){
      return `${base_url}/profiles/${this.file}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
  
  }
  
  