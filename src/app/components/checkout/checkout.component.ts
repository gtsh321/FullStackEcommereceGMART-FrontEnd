import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
    checkoutFormGroup!:FormGroup;
    
    totalPrice:number=0;
    totalQuantity:number=0;

    creditCardYears: number[]=[];
    creditCardMonths: number[]=[];

    constructor(private formBuilder:FormBuilder,
      private luv2ShopService:Luv2ShopFormService){
    }

  ngOnInit(): void {
   
    this.checkoutFormGroup = this.formBuilder.group
    ({

      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard: this.formBuilder.group({
        creditCard:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
      
    })
     
      // populate credit card Months 
       
        const startMonth:number = new Date().getMonth()+1;
        console.log("startMonth: "+ startMonth);

        this.luv2ShopService.getCreditCardMonths(startMonth).subscribe(
          data=>{
            console.log("Retrieved credit card Months: "+ JSON.stringify(data));
            this.creditCardMonths=data;
          }
        )

      //populate credit card years
        this.luv2ShopService.getCreditCardYears().subscribe(
          data=>{
            console.log("Retrieved the credit card years: "+ JSON.stringify(data));
            this.creditCardYears=data;
          }
        )


  }
  
  copyShippingAddressToBillingAddress(event:any)
  {
      if(event.target.checked)
      {
         this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      }
      else
      {
        this.checkoutFormGroup.controls['billingAddress'].reset();
      }
  }
  onSubmit()
  {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

}
