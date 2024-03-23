import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authenticationGuard: CanActivateFn = (
  route,
  state): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  let authenticated = inject(AuthService).isAuthenticated
  if(!authenticated){
    inject(Router).navigateByUrl("/login")
    return false
  }else {
    return true
  }

};


