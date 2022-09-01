import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { MessageCardComponent } from '../ui/message-card/message-card.component';
import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    MessageCardComponent,
  ],
  declarations: [ChatPage],
})
export class ChatPageModule {}
