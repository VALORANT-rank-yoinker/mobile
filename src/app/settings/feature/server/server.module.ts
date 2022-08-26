import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServerPageRoutingModule } from './server-routing.module';

import { ServerPage } from './server.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ServerPageRoutingModule,
  ],
  declarations: [ServerPage],
})
export class ServerPageModule {}
