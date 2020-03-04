import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl:string = "https://rolimapp.com:3000/panelAdmin";

  constructor(private httpClient : HttpClient) { }

  public activeOrders(token){
    let transaction = 
      {
        "transaccion": "pedidosActivos",
      }
    return this.httpClient.post(this.baseUrl,transaction, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
           'x-token': token
         })
    }).map(data=>
     data);
  }

  public updateOrderState(id_order,id_state,token){
    let transaction = 
    {
      "transaccion": "actualizarEstadoPedidos",
      "pedido": id_order,
      "estado": id_state
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
