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


}
