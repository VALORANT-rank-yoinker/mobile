import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  VersionMessage,
  VryLinkService,
} from '../../data-access/vry-link.service';
import { Status } from '../../data-access/web-sockets.service';

@Component({
  selector: 'app-ws-status',
  templateUrl: './ws-status.component.html',
  styleUrls: ['./ws-status.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WsStatusComponent {
  status$ = this.vryLink.status();
  version$ = this.vryLink.version();

  constructor(private vryLink: VryLinkService) {}

  coreMessage(status: Status, version: VersionMessage) {
    if (status !== Status.connected || !version?.core) {
      return;
    }

    return `to Core v${version.core}`;
  }
}
