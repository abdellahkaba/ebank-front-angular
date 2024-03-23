import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false
  roles : any
  username : any
  accessToken! : any


  constructor(private http : HttpClient,private router : Router) { }

  //Une methode qui permet de faire l'authentification login
  public login (username : string, password : string){
    let options = {
        headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params = new HttpParams().
      set("username",username).set("password",password);
    return this.http.post("http://localhost:8087/auth/login",params,options)
  }

  /**
   * stockage du token
   * Charger les informations sur l'utilisateur
   * @param data
   */
  loadProfile(data: any) {
    this.isAuthenticated = true
    this.accessToken = data['access-token']
    let jwtDecoder: any = jwtDecode(this.accessToken)
    //On recupere le role
    this.username = jwtDecoder.sub
    this.roles = jwtDecoder.scope
    //On stocke les identites de utilisateur
    window.localStorage.setItem("jwt-token",this.accessToken)
  }

  logout()  {
    this.isAuthenticated= false ;
    this.accessToken = undefined
    this.roles = undefined
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token")
    if(token){
      this.loadProfile({"access-token" : token})
      this.router.navigateByUrl("/admin/customers")
    }
  }
}
