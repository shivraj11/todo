import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap, first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { StorageKeys } from '../storage/storage-keys.enum';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private allusers: Observable<User[]>;

  protected state: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    public storage: StorageService
  ) { }

  public register(user: User): Observable<User> {
    return this.storage.get<User[]>(StorageKeys.Users)
      .pipe(switchMap(
        users => users
          .find(existingUser => existingUser.email === user.email) ?
          throwError(new Error('Email already taken'))
          : of(users)
      ))
      .pipe(map(existingUsers => {
        user.id = this.uniqueId();
        existingUsers.push(user);
        return this.storage.set(StorageKeys.Users, existingUsers);
      }))
      .pipe(map(() => user));

  }

  public login(email: string, password: string): Observable<User> {
    return this.storage.get<User[]>(StorageKeys.Users)
      .pipe(map(users => users.find(existingUser => existingUser.email === email && existingUser.password === password)))
      .pipe(switchMap(authUser => !!authUser ? of(authUser) : throwError(new Error('Invalid Credentials'))))
      .pipe(switchMap(user => this.loginUser(user)));
  }

  protected loginUser(user: User): Observable<User> {
    return this.storage.set(StorageKeys.AuthUser, user)
      .pipe(tap(() => this.state.next(user)), map(() => user));

  }

  public logout(): Observable<any> {
    // even if it fails remove any way and return null
    console.log('logout');
    return this.storage.remove(StorageKeys.AuthUser)
      .pipe(tap(() => this.state.next(null)), map(() => null));
  }

  public user(): Observable<User | null> {
    return this.state.asObservable();
  }

  public initializeAuthState(): Observable<null> {
    return this.user()
      .pipe(first())
      .pipe(switchMap(result => !result ? this.storage.get<User | null>(StorageKeys.AuthUser) : of(result)))
      .pipe(switchMap(user => !!user ? this.loginUser(user) : of(user)))
      .pipe(map(() => null));
  }

  private uniqueId(): string {
    return Math.random().toString(36).replace('0.', '');
  }

  /**
   * Setups empty list of users in storage if not exists
   */
  public setupUsersList(): Promise<User[]> {
    return this.storage.get<User[] | null>(StorageKeys.Users)
      .pipe(switchMap(users => {
        if ((!!users && Array.isArray(users))) {
          return of(users);
        }
        return this.storage.set(StorageKeys.Users, [])
          .pipe(map(() => []));
      }))
      .toPromise();
  }
}
