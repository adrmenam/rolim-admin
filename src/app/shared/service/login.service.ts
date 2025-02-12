import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl:string = "https://rolimapp.com:3000/usuarios";
  private adminLoginUrl:string = "https://rolimapp.com:3000/admin";

  constructor(private httpClient : HttpClient) { }

  public login(obj){
    let transaction = 
      {
        "transaccion": "autenticar",
        "datosUsuario": obj
      }
    return this.httpClient.post(this.adminLoginUrl,transaction, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).map(data=>
     data);
  }

  public registerUser(obj){
    let transaction = 
      {
        "transaccion": "registrarUsuario",
        "datosUsuario": obj
      }
    return this.httpClient.post(this.baseUrl,transaction, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).map(data=>
     data);
  }

  public validateOtp(obj){
    let transaction = 
      {
        "transaccion": "verificarCodigoOtp",
        "datosUsuario": obj
      }
    return this.httpClient.post(this.baseUrl,transaction, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).map(data=>
     data);
  }

}
