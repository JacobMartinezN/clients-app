import { Action } from '@ngrx/store'
import { Client } from "../client.model";

export enum ClientActionTypes {
    LOAD_CLIENTS = "[Client] Load Client",
    LOAD_CLIENTS_SUCCESS = "[Client] Load Client success",
    LOAD_CLIENTS_FAIL = "[Client] Load Client Fail",
    CREATE_CLIENT = "[Client] Create Client",
    CREATE_CLIENT_SUCCESS = "[Client] Create Client success",
    CREATE_CLIENT_FAIL = "[Client] Craate Client Fail",
}

export class LoadClients implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENTS
}

export class LoadClientsSuccess implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENTS_SUCCESS

    constructor(public payload: Client[]){}
}

export class LoadClientsFail implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENTS_FAIL

    constructor(public payload: string) {}
}

export class CreateClient implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT

    constructor(public payload: Client) {}
}

export class CreateClientSuccess implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT_SUCCESS

    constructor(public payload: Client) {}
}

export class CreateClientFail implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT_FAIL

    constructor(public payload: string) {}
}

export type clientActions =
LoadClients |
LoadClientsSuccess |
LoadClientsFail |
CreateClient |
CreateClientSuccess |
CreateClientFail;