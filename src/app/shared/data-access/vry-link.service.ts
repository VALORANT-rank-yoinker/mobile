import { Injectable } from '@angular/core';
import { startWith, Subject, switchMap, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { WebSocketsService } from './web-sockets.service';

interface VryPayload {
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class VryLinkService {
  messages$ = this.wsService.messages$;

  private refresh$ = new Subject();

  constructor(
    private wsService: WebSocketsService,
    private storage: StorageService
  ) {
    const server$ = this.storage.getAsObservable('server');
    this.refresh$
      .asObservable()
      .pipe(
        startWith(null),
        switchMap((_) => server$),
        tap((server) =>
          this.wsService.connect({
            url: server ? `ws://${server.hostIp}:${server.port}` : undefined,
            reconnect: true,
          })
        )
      )
      .subscribe();
  }

  refresh() {
    this.wsService.close();
    this.refresh$.next(true);
  }
}
