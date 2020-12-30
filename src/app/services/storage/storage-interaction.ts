import { Observable } from 'rxjs';
import { StorageKeys } from './storage-keys.enum';

export interface StorageInteraction {
    get<T extends any>(key: StorageKeys): Observable<T>;
    set<T extends any>(key: StorageKeys, value: T): Observable<boolean>;
    remove(key: StorageKeys): Observable<boolean>;
}
