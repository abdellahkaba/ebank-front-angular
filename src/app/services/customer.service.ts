import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/cusotomer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  //Une methode qui permet de chercher les clients
  public getCustomers () : Observable<Array<Customer>> {
    //On serialize le resultat de la request dans un tableau de customer
    return this.http.get<Array<Customer>>(environment.BACKENDHOST+"/customers")
  }

  public searchCustomers (keyword : string) : Observable<Array<Customer>> {
    //On serialize le resultat de la request dans un tableau de customer
    return this.http.get<Array<Customer>>(environment.BACKENDHOST+"/customers/search?keyword="+keyword)
  }

  //une methode qui ajoute un produit
  public addNewCustomer(customer: Customer) : Observable<Customer>{
    return this.http.post<Customer>(environment.BACKENDHOST+"/customers",customer) ;

  }
}
