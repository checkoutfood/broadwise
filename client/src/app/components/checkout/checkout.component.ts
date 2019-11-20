import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  firstName: String;
  lastName: String;
  email: String;
  mobile: String;
  Address: String;
  address2: String;
  state: String;
  city: String;
  zip: String;
  country: String;
  type: String;
  ccname: String;
  ccnumber: String;
  ccexpiration_month: number;
  ccexpiration_year: number;
  cccvv: String;
  currentselection: String;
  price: number;

  constructor(private flashMessage: FlashMessagesService, private authService: AuthService,
    private router: Router, private validateService: ValidateService) { }

  ngOnInit() {
    if(!this.authService.checkTotalNotZero()){
this.router.navigate(['/cart']);
    }
  }

  orderPlaced() {


    const checkout = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
      Address: this.Address,
      address2: this.address2,
      state: this.state,
      city: this.state,
      zip: this.zip,
      country: this.country
    }

    const card = {
      type: this.type,
      ccname: this.ccname,
      ccnumber: this.ccnumber,
      ccexpiration_month: this.ccexpiration_month,
      ccexpiration_year: this.ccexpiration_year,
      cccvv: this.cccvv
    }

    const paymentDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
      Address: this.Address,
      address2: this.address2,
      state: this.state,
      city: this.state,
      zip: this.zip,
      country: this.country,

      type: this.type,
      ccname: this.ccname,
      ccnumber: this.ccnumber,
      ccexpiration_month: this.ccexpiration_month,
      ccexpiration_year: this.ccexpiration_year,
      cccvv: this.cccvv,

      currentselection: this.authService.getCurrentselection(),
      price: this.authService.getTotal()


    }

    if (!this.validateService.validateCheckout(checkout)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateCard(card)) {
      this.flashMessage.show('Please fill all the card details', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

//call the server side api and make a stripe payment


this.authService.makePayment(paymentDetails).subscribe(data=>{
  console.log(data);
  if(data.success){
    this.flashMessage.show('Your order is Placed and Successfully Paid', { cssClass: 'alert-success', timeout: 3000 });
   // this.authService.orderClear();
    this.router.navigate(['/']);
    //navigate to a new page called payment receipt page and show transaction references etc
  }else{
    this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
    //this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
  }
});




    // this.flashMessage.show('Your order is Placed', { cssClass: 'alert-success', timeout: 8000 });
    // this.authService.orderClear();
    // this.router.navigate(['/']);
  }

}
