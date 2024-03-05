import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers : any
  errorMessage!: string

  /**
   * On injecte le service CustomerService
   * @param customerService
   */

  constructor(private customerService : CustomerService) {
  }
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next : (data) => {
        this.customers = data
      },
      error : (err) => {
        this.errorMessage = err.message
      }
    })
  }

}
