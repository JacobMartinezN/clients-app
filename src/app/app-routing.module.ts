import { ClientComponent } from './client/client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'clients',
    component: ClientComponent,
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule) 
  },
  { path: '**', pathMatch: 'full', redirectTo: 'clients'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }