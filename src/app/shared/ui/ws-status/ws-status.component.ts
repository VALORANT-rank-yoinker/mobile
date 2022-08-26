import { Component } from '@angular/core';
import { WebSocketsService } from '../../data-access/web-sockets.service';

@Component({
  selector: 'app-ws-status',
  templateUrl: './ws-status.component.html',
  styleUrls: ['./ws-status.component.scss'],
})
export class WsStatusComponent {
  status$ = this.webSockets.status$.asObservable();

  constructor(private webSockets: WebSocketsService) {}
}
