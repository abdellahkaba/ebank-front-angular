import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService implements OnInit{
  constructor(private http : HttpClient) {
  }
  ngOnInit(): void {
  }

  public getAccount(accountId : string, page : number, size : number ) : Observable<AccountDetails> {
    return this.http.get<AccountDetails>("http://localhost:8085/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size)
  }

  /**
   * Methode de service de debit
   * @param accountId
   * @param page
   * @param size
   */
  public debit(accountId : string, amount : number, description : string ) {
    let data = {
      accountId : accountId,
      amount : amount,
      description : description}
    return this.http.post("http://localhost:8085/accounts/debit", data)
  }

  public credit(accountId : string, amount : number, description : string ) {
    let data = {
      accountId : accountId,
      amount : amount,
      description : description}
    return this.http.post("http://localhost:8085/accounts/credit", data)
  }

  public transfert(accountSource : string, accountDestination : string, amount : number, description : string ) {
    let data = {
      accountSource : accountSource,
      accountDestination : accountDestination,
      amount : amount,
      description : description}
    return this.http.post("http://localhost:8085/accounts/transfert", data)
  }
}
