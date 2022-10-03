import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcomDataService } from '../ecom-data.service';
import { EcomServiceService } from '../ecom-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private dataservice:EcomDataService,private formbuilder:FormBuilder,private api:EcomServiceService,private router:Router) { }
  item:any;
  quantity=1;
  price:any;
  user:any;
  ngOnInit(): void {
    this.item =this.dataservice.getObject();
    this.price=this.item.productPrice;
    console.log(this.item)
    this.user = JSON.parse(localStorage.getItem('User')||" ");
    // this.user = this.dataservice.getUser();
    // console.log("user",this.user)
  }

  myForm: FormGroup = this.formbuilder.group({
    cardNumber: ["", [Validators.required]],
    cardExpire:["", [Validators.required]],
    cardcvv:["", [Validators.required]],


  
  })

  quanchange()
  {
    this.price = this.item.productPrice*this.quantity;
  }

  placeOrder()
  {
    if(this.myForm.status=='VALID')
    {
      //create order
      let order = {
        productId : this.item.productId,
        customerId : this.user.customerId,
        orderQuantity:this.quantity,
        orderPrice : this.price,
        shipmentAddress :this.user.address,
      }
      let createorderurl=`https://localhost:44309/api/ApiGateway/addorder`
      this.api.post(createorderurl,order).subscribe(res=>{
        console.log("Order created",res)
        let orderRes = JSON.parse(JSON.stringify(res));
        let pay = {
          orderId : 700,
          customerId : this.user.customerId,
          paymentMode:"card",
          cardNumber : this.myForm.value.cardNumber,
          cardCvv :this.myForm.value.cardcvv,
          cardExpiry:"2022-09-29T19:59:02.921Z",
          cardName:"MasterVisa"
        }
        let paymenturl = `https://localhost:44309/api/ApiGateway/payment`;
        this.api.post(paymenturl,pay).subscribe(paymentresponse=>{
          console.log("payment",paymentresponse)
          alert("Order Placed")
          this.router.navigateByUrl('');

        })
      })
    }else{
      alert("Enter Card Details")
    }
  }


}
