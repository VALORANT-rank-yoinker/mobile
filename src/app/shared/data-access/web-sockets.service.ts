import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { catchError, retry, switchAll, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export const WS_ENDPOINT = `ws://${window.location.hostname}:1100`;
export const RECONNECT_INTERVAL = 5000;

export enum Status {
  initial = 'Initial',
  connected = 'Connected',
  disconnected = 'Disconnected',
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketsService {
  public messages$: Observable<unknown>;
  public status$ = new BehaviorSubject(Status.initial);

  private socket$: WebSocketSubject<unknown>;
  private messagesSubject$ = new Subject();

  constructor() {
    this.messages$ = this.messagesSubject$.pipe(
      switchAll(),
      catchError((e) => {
        throw e;
      })
    );
  }

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   *
   * @param cfg if true the observable will be retried.
   */
  public connect(
    cfg: { url?: string; reconnect: boolean } = {
      url: WS_ENDPOINT,
      reconnect: false,
    }
  ): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(cfg.url || WS_ENDPOINT);
      console.log('[WS Service] Try to connect', cfg.url || WS_ENDPOINT);
      const messages = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : (o) => o,
        tap({
          error: (error) => console.log(error),
        }),
        catchError((_) => EMPTY)
      );
      //TODO: only next an observable if a new subscription was made double-check this
      this.messagesSubject$.next(messages);
    }
  }

  close() {
    this.socket$.complete();
    this.socket$ = undefined;
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  /**
   * Retry a given observable by a time span
   *
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retry({
        resetOnSuccess: true,
        delay: (_err, retryCount) => {
          const retryTime = Math.min(1000 * 60, 1000 * 2 ** retryCount);
          console.log(
            `[WS Service]: Try to reconnect', attempt: ${retryCount}`
          );
          console.log(
            `[WS Service]: Next reconnect after ${retryTime / 1000}s`
          );
          return timer(retryTime);
        },
      })
    );
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket(url: string) {
    return webSocket({
      url,
      openObserver: {
        next: () => {
          console.log('[WS Service]: connection ok');
          this.status$.next(Status.connected);
        },
      },
      closeObserver: {
        next: () => {
          console.log('[WS Service]: connection closed');
          this.status$.next(Status.disconnected);
          this.socket$?.complete();
          // this.socket$ = undefined;
          // this.connect({ url, reconnect: true });
        },
      },
    });
  }
}

/*Credits to https://github.com/lamisChebbi/ng-realtime-dashboard*/
