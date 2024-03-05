import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/cusotomer.model";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup!: FormGroup

  /**
   * Injection de formBuilder
   * @param fb
   * Injection de serviceCustomer
   * @param customerService
   */

  constructor(private fb : FormBuilder, private customerService : CustomerService) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
        name: this.fb.control(""),
        email: this.fb.control("")
    })
  }

  handleAddCustomer() {
    let customer:Customer = this.newCustomerFormGroup.value
    this.customerService.addNewCustomer(customer).subscribe({
      next : data=> {
        alert("Client ajouté avec success")
      },
      error : err => {
        console.log(err)
      }
    })
  }
}
