import { LoadClients, CreateClient, CreateClientSuccess, CreateClientFail } from './client.actions';
import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { ClientService } from "../client.service";
import * as clientActions from "../state/client.actions";
import { Client } from "../client.model";

@Injectable()
export class ClientEffect {
    constructor(
        private actions$: Actions,
        private clientService: ClientService
    ) { }

    @Effect()
    loadClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.LoadClients>(
            clientActions.ClientActionTypes.LOAD_CLIENTS
        ),
        mergeMap((action: clientActions.LoadClients) =>
        this.clientService.getClients().pipe(
            map(
            (clients: Client[]) =>
                new clientActions.LoadClientsSuccess(clients)
            ),
            catchError(err => of(new clientActions.LoadClientsFail(err)))
        )
        )
    );

    @Effect()
    createClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.CreateClient>(
            clientActions.ClientActionTypes.CREATE_CLIENT
        ),
        map((action: clientActions.CreateClient) => action.payload),
        mergeMap((customer: Client) =>
            this.clientService.createClient(customer).pipe(
            map(
            (newCustomer: Client) =>
                new clientActions.CreateClientSuccess(newCustomer)
            ),
            catchError(err => of(new clientActions.CreateClientFail(err)))
        )
        )
    );
}