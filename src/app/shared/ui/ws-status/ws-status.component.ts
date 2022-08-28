import { Component } from '@angular/core';
import { VryLinkService } from '../../data-access/vry-link.service';
import { Status } from '../../data-access/web-sockets.service';

@Component({
  selector: 'app-ws-status',
  templateUrl: './ws-status.component.html',
  styleUrls: ['./ws-status.component.scss'],
})
export class WsStatusComponent {
  status$ = this.vryLink.status();
  version$ = this.vryLink.getMessagesOfType('version');

  constructor(private vryLink: VryLinkService) {}

  isConnected(status: Status) {
    return status === Status.connected;
  }
}
