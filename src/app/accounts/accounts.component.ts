import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup!: FormGroup
  currentPage : number = 0
  pageSize : number = 5
  accountObservable! : Observable<AccountDetails>
  operationFormGroup! : FormGroup

  /**
   * Injection de formBuilder
   * @param fb
   * Injection de service Account
   * @param accountService
   */
  constructor(private fb: FormBuilder,private accountService : AccountsService) {
  }
  ngOnInit(): void {
    /**
     * On genere notre formulaire de Compte et operation
     */
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control("")
    })
    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })

  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId
    this.accountObservable = this.accountService.getAccount(accountId,this.currentPage,this.pageSize)
  }

  gotoPage(page: number) {
    this.currentPage = page
    /**
     * On recharge le compte
     */
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    let accountId : string = this.accountFormGroup.value['accountId']
    let operationType = this.operationFormGroup.value['operationType']
    let amount :  number = this.operationFormGroup.value['amount']
    let description : string = this.operationFormGroup.value['description']
    let accountDestination : string = this.operationFormGroup.value['accountDestination']
    let accountSource : string = this.operationFormGroup.value['accountSource']
    if (operationType == 'DEBIT'){
        this.accountService.debit(accountId, amount, description).subscribe({
          next : (data) => {
            alert("Operation de debit reussie !")
            this.operationFormGroup.reset()
            this.handleSearchAccount()
          },
          error : (err) => {
            console.log(err)
          }
        })
    }else if (operationType == 'CREDIT'){
      this.accountService.credit(accountId, amount, description).subscribe({
        next : (data) => {
          alert("Operation de credit reussie !")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },
        error : (err) => {
          console.log(err)
        }
      })
    }else if (operationType == 'TRANSFERT'){
      this.accountService.transfert(accountId, accountDestination, amount,description).subscribe({
        next : (data) => {
          alert("Operation de tranfert reussie !")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },
        error : (err) => {
          console.log(err)
        }
      })
    }

  }
}
