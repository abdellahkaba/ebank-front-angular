import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/cusotomer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

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
   * Injection de router
   * @param router
   */

  constructor(private fb : FormBuilder, private customerService : CustomerService, private router: Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
        name: this.fb.control(null, [Validators.required]),
        email: this.fb.control(null, [Validators.required, Validators.email])
    })
  }

  handleAddCustomer() {
    let customer:Customer = this.newCustomerFormGroup.value
    this.customerService.addNewCustomer(customer).subscribe({
      next : data=> {
        alert("Client ajouté avec success")
       // this.newCustomerFormGroup.reset()
        this.router.navigateByUrl("/admin/customers")
      },
      error : err => {
        console.log(err)
      }
    })
  }
}
