import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, filter, firstValueFrom, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageReady.next(true);
  }

  getAsObservable(key: string) {
    return this.storageReady.pipe(
      filter(Boolean),
      switchMap(() => from(this.storage.get(key)))
    );
  }

  async get(key: string) {
    await firstValueFrom(this.storageReady.pipe(filter(Boolean)));
    await this.storage.get(key);
  }

  async set(key: string, val: any) {
    await firstValueFrom(this.storageReady.pipe(filter(Boolean)));
    await this.storage.set(key, val);
  }
}
