import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = []

  constructor(private router: Router) {
    this.user_list = userListDB.list_user;
  }

  public settings = {
    columns: {
      /*avatar: {
        title: 'Avatar',
        type: 'html'
      },*/
      fName: {
        title: 'Nombre',
      },
      lName: {
        title: 'Apellido'
      },
      email: {
        title: 'Email'
      },
      /*last_login: {
        title: 'Last Login'
      },*/
      /*role: {
        title: 'Role'
      },*/
    },
  };

  ngOnInit() {
    
  }

}

