import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerPage } from './server.page';

const routes: Routes = [
  {
    path: '',
    component: ServerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerPageRoutingModule {}
