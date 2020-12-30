import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectedIfAuthenticatedGuard implements CanActivate {

  constructor(
    public router: Router,
    public auth: AuthService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.initializeAuthState()
      .pipe(switchMap(() => this.auth.user()), tap(value => console.log(value)))
      .pipe(first())
      .pipe(map(user => !!user ? this.router.createUrlTree(['/home']) : true));
  }

}
