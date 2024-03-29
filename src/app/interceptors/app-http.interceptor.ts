 import { HttpInterceptorFn } from '@angular/common/http';
 import {inject} from "@angular/core";
 import {AuthService} from "../services/auth.service";
 import {catchError, throwError} from "rxjs";

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("*********")
  console.log(req.url)
  let authService = inject(AuthService).accessToken;
  if (!req.url.includes("/auth/login")){
    let request = req.clone({
      /*setHeaders : {
        Authorization : `Bearer${authService}`
      }*/
       headers : req.headers.set('Authorization','Bearer '+authService)
    })
    return next(request).pipe(
      catchError(err => {
        if (err.status == 401){
          authService.logout()
        }
        return throwError(err.message())
      })
    )
  } else return next(req) ;

};

