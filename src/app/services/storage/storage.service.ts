import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageInteraction } from './storage-interaction';
import { StorageKeys } from './storage-keys.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements StorageInteraction {

  constructor() { }

  /**
   * Get item
   * @param key contains storage keys
   */
  public get<T extends any =  any>(key: StorageKeys): Observable<T> {
    return of(this.driver().getItem(key))
      .pipe(map(stringValue => JSON.parse(stringValue)));
  }

  public set<T extends any>(key: StorageKeys, value: T): Observable<boolean> {
    return of(this.driver().setItem(key, this.json(value)))
      .pipe(map(() => true));
  }

  public remove(key: StorageKeys): Observable<boolean> {
    return of(this.driver().removeItem(key))
      .pipe(map(() => true));
  }

  public driver(): Storage {
    return localStorage;
  }

  private json(value: any): string {
    return JSON.stringify(value);
  }

}
