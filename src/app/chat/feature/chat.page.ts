import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { isEqual } from 'lodash-es';
import { distinctUntilChanged, Observable, scan, Subject, tap } from 'rxjs';
import { VryLinkService } from 'src/app/shared/data-access/vry-link.service';
import { ChatMessage } from '../data-access/chat.interface';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  @ViewChild(IonContent) content: IonContent;

  refresh$ = new Subject();
  messages$: Observable<ChatMessage[]>;

  constructor(private vryLink: VryLinkService) {
    this.messages$ = this.vryLink.getMessagesOfType('chat').pipe(
      distinctUntilChanged(isEqual),
      scan((acc, value) => [...acc, value], []),
      tap(() => {
        this.content?.scrollToBottom(200);
      })
    );
  }

  async doRefresh(event: any) {
    this.vryLink.refresh();
    event.target.complete();
  }
}
