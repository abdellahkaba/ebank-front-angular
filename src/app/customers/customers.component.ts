import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/cusotomer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Array<Customer>>
  errorMessage!: string
  searchformGroup! : FormGroup  // on injdecte le service formBuilder


  /**
   * Injections des dependances
   * @param customerService
   * @param fb
   * @param router
   */
  constructor(private customerService : CustomerService, private fb : FormBuilder, private router : Router) {
  }
  ngOnInit(): void {
    this.searchformGroup = this.fb.group({
      keyword : this.fb.control("")
    })
    this.handleSearchCustomer()
  }

  handleSearchCustomer() {
    let key = this.searchformGroup?.value.keyword
    this.customers = this.customerService.searchCustomers(key).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )
  }

  /**
   * Une methode qui appelle la fonction suppression de
   * customer dans le service
   * @param c
   */
  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Vous êtes sur de supprimer ? ")
      if (!conf) return
      this.customerService.delete(c.id).subscribe({
        next :(data) => {
          //on recharge la page
          //this.handleSearchCustomer()
          this.customers = this.customers.pipe(
            map(data => {
              let index = data.indexOf(c)
              data.slice(index,1)
              return data
            })
          )
        },
        error : err => {
          console.log(err)
        }
      })
  }

  handleCustomerAccounts(customer: Customer) {
      this.router.navigateByUrl("/customer-accounts/"+customer.id, {state :customer})
  }
}
