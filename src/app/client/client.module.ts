import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { clientReducer } from "./state/client.reducer";
import { ClientEffect } from './state/client.effects';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientItemComponent } from './client-item/client-item.component';
import { ClientComponent } from './client/client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const clientRoutes: Routes = [
  { path: "", component: ClientComponent} 
]

@NgModule({
  declarations: [ClientListComponent, ClientItemComponent, ClientComponent, AddClientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(clientRoutes),
    StoreModule.forFeature("clients", clientReducer),
    EffectsModule.forFeature([ClientEffect])
  ]
})
export class ClientModule { }
