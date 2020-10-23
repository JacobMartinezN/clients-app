import * as clientActions from "./client.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity"

import { Client } from "../client.model";
import * as fromRoot from "../../state/app-state";

export interface ClientState extends EntityState<Client> {
    selectedClientId: number | null;
    loading: boolean,
    loaded: boolean,
    error: string,
};

export interface AppState extends fromRoot.AppState {
    clients: ClientState
};

export const clientAdapter: EntityAdapter<Client> = createEntityAdapter<Client>();

export const defaultClient: ClientState = {
    ids: [],
    entities: {},
    selectedClientId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = clientAdapter.getInitialState(defaultClient)

export function clientReducer(
    state = initialState,
    action: clientActions.clientActions
): ClientState {
    switch(action.type) {
        case clientActions.ClientActionTypes.LOAD_CLIENTS: {
            return {
                ...state,
                loading: true,
            };
        }
        
        case clientActions.ClientActionTypes.LOAD_CLIENTS_SUCCESS: {
            return clientAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            })
        }

        case clientActions.ClientActionTypes.LOAD_CLIENTS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            }
        }

        case clientActions.ClientActionTypes.CREATE_CLIENT_SUCCESS: {
            return clientAdapter.addOne(action.payload, state);
        }

        case clientActions.ClientActionTypes.CREATE_CLIENT_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }

        default: {
            return state;
        }

    }
}

const getClientFeatureState = createFeatureSelector<ClientState>(
    "clients"
)

export const getClients = createSelector(
    getClientFeatureState,
    clientAdapter.getSelectors().selectAll
)

export const getClientsLoading = createSelector(
    getClientFeatureState,
    (state: ClientState) => state.loading
)

export const getClientsLoaded = createSelector(
    getClientFeatureState,
    (state: ClientState) => state.loaded
)

export const getError = createSelector(
    getClientFeatureState,
    (state: ClientState) => state.error
)