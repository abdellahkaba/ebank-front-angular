import {Injectable} from '@angular/core';
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
    return this.http.get<Array<Customer>>("http://localhost:8085/customers")
  }

  public searchCustomers (keyword : string) : Observable<Array<Customer>> {
    //On serialize le resultat de la request dans un tableau de customer
    return this.http.get<Array<Customer>>("http://localhost:8085/customers/search?keyword="+keyword)
  }

  /**
   * Une methode qui ajoute un customer
   * @param customer
   */
  public addNewCustomer(customer: Customer) : Observable<Customer>{
    return this.http.post<Customer>("http://localhost:8085/customers",customer) ;

  }

  /**
   * Une methode qui supprime un customer
   * @param id
   */
  public delete(id : number){
     return this.http.delete("http://localhost:8085/customers/"+id) ;

  }

}
