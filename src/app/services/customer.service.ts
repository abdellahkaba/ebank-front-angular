import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/cusotomer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  //Une methode qui permet de chercher les clients
  public getCustomers () : Observable<Array<Customer>> {
    //On serialize le resultat de la requete dans un tableau de customer
    return this.http.get<Array<Customer>>("http://localhost:8085/customers")
  }
}
