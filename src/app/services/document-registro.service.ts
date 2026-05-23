import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { DocumentoRegistro } from '../models/documentoRegistro.model';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DocumentRegistroService {

 public Document!: DocumentoRegistro;


  constructor(private http: HttpClient,
    public authService: AuthService
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  getDocuments() {
    const url = `${baseUrl}/documentregistro`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, documents: Document[] }) => resp.documents)
      )
  }


   getDocument(_id: string) {
      const url = `${baseUrl}/documentregistro/${_id}`;
      return this.http.get<any>(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, documento: Document}) => resp.documento)
          );
    }

  getDocumentsByUser(_id: string) {
    const url = `${baseUrl}/documentregistro/user/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, documentos: Document }) => resp.documentos)
      );
  }
  


  createDocument(data: any) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authService.token });
    const URL = baseUrl + '/documentregistro/crear';
    return this.http.post(URL, data, this.headers);
  }
  updateDocument(data: any, document_id: any,) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authService.token })
    const URL = baseUrl + '/documentregistro/actualizar/' + document_id;
    return this.http.post(URL, data, this.headers);
  }
  updateStatus(data: any, document_id: any) {
    const url = `${baseUrl}/documentregistro/update-status/${document_id}`;
    return this.http.put(url, data, this.headers);
  }

  deleteDocument(_id: string) {
    const url = `${baseUrl}/documentregistro/borrar/${_id}`;
    return this.http.delete(url, this.headers);
  }
 
}
