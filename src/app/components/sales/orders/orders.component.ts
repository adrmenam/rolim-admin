import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { orderDB } from "../../../shared/tables/order-list";
import { Router, NavigationEnd } from '@angular/router';
import { OrdersService } from 'src/app/shared/service/orders.service';
import { ConfigurationService } from 'src/app/shared/service/configuration.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public order = [];
  public temp = [];
  public states = [];
  public isLoaded: boolean = false;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private router: Router, private orderService: OrdersService, private configurationService: ConfigurationService) {
    
    
    //this.order = orderDB.list_order;
  }

  updateFilter(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.temp.filter(d => 
      d.id_orden.toString().includes(val) || d.estado_orden.toLowerCase().includes(val.toLowerCase()) || d.fecha_creacion.includes(val) || d.fecha_entrega.includes(val)
    );

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  loadOrders(){
    this.order = []
    this.isLoaded = false;
    this.orderService.activeOrders(localStorage.getItem('token')).subscribe(response => {
      console.log(response);
      if(response['codigoRetorno'] == "0001"){
        response['modulos'].forEach(element => {
          
          this.order.push({
              "id_orden": element.pedido, 
              // "estado_orden": "<span class='badge badge-success'>"+element.estado+"</span>",
              "estado_orden": element.estado,
              "fecha_creacion": element.fecha_pedido.split('T')[0],
              "fecha_entrega": element.fecha_entrega.split('T')[0],
              "tipo_pedido":  element.tipo_pedido 
          });
        });
      }
      
      console.log(this.order);
      this.isLoaded=true;
      this.temp=this.order;
    });
  }
  ngOnInit() {
    this.loadOrders();

    this.configurationService.getCatalog("estados_pedidos",localStorage.getItem('token')).subscribe(response => {
      console.log(response);
      if(response['codigoRetorno'] == "0001"){
        this.states = response['catalogo'];
      }
    });
    
  }

  onSelect(row) {
    console.log(row);
    //const state = this.states.filter(state=>state.desripcion==row.estado_orden);
    const state = this.states.filter(state=>state.desripcion=="ESCANEO DE ENTRADA");
    // console.log(this.states);
    // console.log(state);
    console.log("estado actual: "+state[0]['item']);
    this.orderService.updateOrderState(row.id_orden,state[0]['item']+1,localStorage.getItem('token')).subscribe(response => {
      console.log(response);
      if(response['codigoRetorno'] == "0001"){
        alert("El estado de la orden se actualizó correctamente");
        this.loadOrders();
      }else{
        alert("El estado de la orden no se pudo actualizar: "+ response['error']);
      }
    });
  }


}
