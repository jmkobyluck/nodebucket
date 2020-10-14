// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: auth guard
// ;===========================================
// */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    // is user authorized?
    if (sessionUser) {
      console.log(sessionUser);
      return true;

      // if not authorized, route to sign in page
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
