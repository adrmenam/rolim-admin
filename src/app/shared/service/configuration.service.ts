import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private baseUrl:string = "https://rolimapp.com:3000/panelAdmin";

  constructor(private httpClient : HttpClient) { }

  public getCatalog(type, token){
    let transaction = 
    {
      "transaccion": "obtenerCatalogos",
      "tipo": type
    }
    return this.httpClient.post(this.baseUrl,transaction, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'x-token': token
         })
    }).map(data=>
     data);
  }
}
