import { Component, OnInit } from '@angular/core';

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as clientActions  from "..//state/client.actions";
import * as fromClient from "../state/client.reducer";
import { Client } from "../client.model";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {
  clients$: Observable<Client[]>;
  error$: Observable<String>;
  constructor(private store: Store<fromClient.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new clientActions.LoadClients());
    this.clients$ = this.store.pipe(select(fromClient.getClients));
    this.error$ = this.store.pipe(select(fromClient.getError));
  }

}
