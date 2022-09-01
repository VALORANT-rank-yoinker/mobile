import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PlayerCardComponent } from 'src/app/shared/ui/player-card/player-card.component';
import { PlayerInfoModalComponent } from 'src/app/shared/ui/player-info-modal/player-info-modal.component';

import { LivePageRoutingModule } from './live-routing.module';

import { LivePage } from './live.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivePageRoutingModule,
    PlayerCardComponent,
    PlayerInfoModalComponent,
  ],
  declarations: [LivePage],
})
export class LivePageModule {}
