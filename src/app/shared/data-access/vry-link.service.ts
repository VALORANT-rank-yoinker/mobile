import { Injectable } from '@angular/core';
import {
  filter,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { StorageService } from './storage.service';
import { WebSocketsService } from './web-sockets.service';

export enum VryMessageTypeEnum {
  heartbeat = 'heartbeat',
  version = 'version',
  chat = 'chat',
}

export type VryMessageType = keyof typeof VryMessageTypeEnum;

export interface VryMessage {
  [key: string]: any;
  type: VryMessageType;
}

export interface VersionMessage extends VryMessage {
  core: string;
}

@Injectable({
  providedIn: 'root',
})
export class VryLinkService {
  private messages$: Observable<VryMessage>;
  private version$: Observable<VersionMessage>;
  private refresh$ = new Subject();

  constructor(
    private wsService: WebSocketsService,
    private storage: StorageService
  ) {
    this.messages$ = this.wsService.messages$.pipe(
      shareReplay({
        refCount: false,
        bufferSize: 10,
        windowTime: 60 * 1000,
      })
    ) as Observable<VryMessage>;

    this.version$ = this.getMessagesOfType<VersionMessage>('version').pipe(
      shareReplay(1)
    );

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

  getAllMessages() {
    return this.messages$;
  }

  getMessagesOfType<T extends VryMessage>(type: VryMessageType) {
    return this.messages$.pipe(filter((x: T) => x.type === type));
  }

  version() {
    return this.version$;
  }

  status() {
    return this.wsService.status$.asObservable();
  }

  refresh() {
    this.wsService.close();
    this.refresh$.next(true);
  }
}
