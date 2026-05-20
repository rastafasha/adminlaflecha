import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { generateSubcription, planPaypalSubcription, productPaypalSubcription } from '../models/planPaypalSubcription';

import { subcriptionPaypal } from '../models/subcriptionPaypal';

const CLIENT = environment.clientIdPaypal;
const SECRET = environment.secretPaypal;
const PAYPAL_API = environment.paypalApi;

const auth = { user: CLIENT, pass: SECRET };

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlanPaypalSubcriptionService {
  paginaPost = 0;

  public planPaypal: planPaypalSubcription;
  public data: planPaypalSubcription;
  public generateSubcription: generateSubcription;
  public subcription: subcriptionPaypal;
  public productPaypal: productPaypalSubcription;

  constructor(private http: HttpClient) { }



  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      auth
    }
  }

  get type(): 'PHYSICAL' | 'DIGITAL' | 'SERVICE' {
    return this.productPaypal.type;
  }


  getPlanPaypals() {
    const url = `${baseUrl}/paypal/plans`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, data: planPaypalSubcription }) => resp.data)
      )
  }

  getPlanPaypal(id: string) {
    const url = `${baseUrl}/paypal/plan/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, planPaypal: planPaypalSubcription }) => resp.planPaypal)
      );
  }

  updatePlan(planPaypal: planPaypalSubcription) {
    const url = `${baseUrl}/paypal/editar-plan/${planPaypal.id}`;
    return this.http.patch(url, planPaypal, this.headers);

  }

  createPlanSubcription(planPaypal: any) {
    const url = `${baseUrl}/paypal/create-plan`;
    return this.http.post(url, planPaypal, this.headers);

  }

  getPlanPaypalsPage(page: number, limit: number = 50) {
    return this.http.get<planPaypalSubcription>(`${baseUrl}/paypal/planes-paypal?page=${page}&limit=${limit}`);
  }


  //products

  createProducSubcription(productPaypal: any) {
    const url = `${baseUrl}/paypal/create-product`;
    return this.http.post(url, productPaypal, this.headers);

  }
  updateProduct(productPaypal: productPaypalSubcription) {
    const url = `${baseUrl}/paypal/editar-product/${productPaypal.id}`;
    return this.http.put(url, productPaypal, this.headers);

  }

  getProductPaypal(id: string) {
    const url = `${baseUrl}/paypal/product/${id}`;
    return this.http.get<any>(url, this.headers);
  }
  getProductPaypals() {
    const url = `${baseUrl}/paypal/products`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, data: productPaypalSubcription }) => resp.data)
      )
  }

  getProducts() {
    const url = `${baseUrl}/paypal/products/`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, productPaypals: productPaypalSubcription }) => resp.productPaypals)
      )
  }

  getProductPaypalsPage(page: number = 1): Observable<any> {
    return this.http.get(`${baseUrl}/paypal/products-paypal?page=${page}`);
  }


  activar(id: planPaypalSubcription): Observable<any> {
    // const url = `${PAYPAL_API}/v1/billing/plans/${id}/activate`;
    const url = `${baseUrl}/paypal/activar-plan/${id}`;
    return this.http.post(url, this.headers);

  }
  desactivar(id: planPaypalSubcription): Observable<any> {
    // const url = `${PAYPAL_API}/v1/billing/plans/${id}/deactivate`;
    const url = `${baseUrl}/paypal/desactivar-plan/${id}`;
    return this.http.post(url, this.headers);

  }
  deleteProduct(id: any): Observable<any> {
    // const url = `${PAYPAL_API}/v1/billing/plans/${id}/deactivate`;
    const url = `${baseUrl}/paypal/productborrar/${id}`;
    return this.http.post(url, this.headers);

  }
  getSubcription(id: string) {
    const url = `${baseUrl}/paypal/subcription/${id}`;
    return this.http.get<any>(url, this.headers);
  }



  // subcriptions

  getSubcriptions() {
    const url = `${baseUrl}/subcriptionpaypal`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, subcriptionPaypals: planPaypalSubcription }) => resp.subcriptionPaypals)
      )
  }
  getRecientes() {
    const url = `${baseUrl}/subcriptionpaypal/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, subcriptions: planPaypalSubcription }) => resp.subcriptions)
      )
  }



  getByUser(usuario: any) {
    const url = `${baseUrl}/subcriptionpaypal/user_profile/${usuario}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, subcriptions: subcriptionPaypal }) => resp.subcriptions)
      )
  }


  // crud

  // getPlans()  {
  //   const url = `${baseUrl}/planpaypal`;
  //   return this.http.get<any>(url, this.headers)
  //     .pipe(
  //       map((resp:{ok: boolean, planPaypals: planPaypalSubcription}) => resp.planPaypals)
  //     )
  // }

  // createPlan(planPaypal:any) {
  //   const url = `${baseUrl}/planpaypal/crear`;
  //   return this.http.post(url, planPaypal, this.headers);

  // }

  // deleteProduct(product: any) {
  //   const url = `${baseUrl}/paypal/productborrar/${product}`;
  //   return this.http.delete(url, this.headers);
  // }








}
