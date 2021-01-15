import { Observable,of } from 'rxjs';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import {Customer} from '../customer';
import {Demo} from '../Demo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { numberSymbols } from '@progress/kendo-angular-intl';
import { process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult,DataStateChangeEvent } from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  customers:Observable<Customer[]>;
  public gridData: GridDataResult;
  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5,
    filter: {
      logic: 'and',
      filters: [{ field: 'demo.name', operator: 'contains', value: 'gold' }]
    }
  };
  
  public dataStateChange(state: DataStateChangeEvent): void {
      console.log(`state`);
      this.state = state;
      //this.gridData = process(this.customers, this.state);
      console.log(this.state);
     // console.log(this.gridData);
  }

  customeridtoupdate =  null;
  constructor(private customerservice: CustomerService) { 
  }
  
  public source: Array<{ text: string, demoId: number }> = [
    { text: 'Gold', demoId: 1001 },
    { text: 'Diamond', demoId: 1002 },
    { text: 'Platinum', demoId: 1003 }
  ];
  public data: Array<{ text: string, demoId: number }>;

  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    issubcribed: new FormControl(),
    demoId: new FormControl()
  });

  public clearForm(): void {
    this.form.reset();
  }

  onSubmit(){
    if(this.customeridtoupdate == null){
    const customer = this.form.value;  
    console.log(customer); 
    this.customerservice.CreateCustomer(customer).subscribe(()=>{this.getCustomers();
    this.customeridtoupdate == null;
    });
    this.form.reset(); 
    }
    else{
      const customer = this.form.value;  
      customer.id = this.customeridtoupdate;
      this.customerservice.UpdateCustomer(customer).subscribe(() =>{
        this.getCustomers();
        this.form.reset(); 
        this.customeridtoupdate == null;
      }); 
    }
  }

  loadcustomertoedit(id:number){
    this.customerservice.getCustomer(id).subscribe(customer=> {   
      this.customeridtoupdate = customer.id;  
      this.form.controls['name'].setValue(customer.name);  
      this.form.controls['issubcribed'].setValue(customer.issubcribed);  
      this.form.controls['demoId'].setValue(customer.demoId);  
      console.log(customer);
    });  
  }

  deletecustomer(id:number){
      if (confirm("Are you sure you want to delete this ?")) {   
      this.customerservice.DeleteCustomer(id).subscribe(() => { 
        this.getCustomers();
      });  
    }
  }
  
  ngOnInit(): void {
    this.getCustomers();
    this.data = this.source;
     //  console.log(this.customers);
    //this.gridData= {data: this.customers, total: this.customers.length};
  }
  handleFilter(value) {
    this.data = this.source.filter((s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  getCustomers():void{
   this.customers =  this.customerservice.getAllCustomer();
  }
  

}
