import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authorizationGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService).roles.includes("ADMIN")
  if (authService){
    return true
  }else {
    inject(Router).navigateByUrl("/admin/notAuthorized")
    return false
  }
};
