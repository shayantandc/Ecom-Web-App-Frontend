import { Component, OnInit } from '@angular/core';
import { EcomServiceService } from '../ecom-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private api:EcomServiceService) { }
  orders:any[]=[];
  list:any[]=[];

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders()
  {
    let myData = JSON.parse(localStorage.getItem('User') || "");
    console.log(myData)
    console.log(typeof myData)
    let url = "https://localhost:44309/api/ApiGateway/allorders";
    this.api.get(url).subscribe(res=>{
      let response = JSON.parse(JSON.stringify(res));
      this.orders=response;
       this.orders = this.orders.filter(o=>o.customerId==myData.customerId)
       let that=this
       this.orders.forEach(function(order:any){
        let productId=order.productId;
        let customerId = order.customerId;
        let productUrl = `https://localhost:44309/api/ApiGateway/getproductbyId?id=${productId}`;
        let customerUrl = `https://localhost:44309/api/ApiGateway/getcustomerbyId?id=${customerId}`
        that.api.post(productUrl).subscribe(r=>{
          let prodRes = JSON.parse(JSON.stringify(r));
            that.api.post(customerUrl).subscribe(o=>{
              let custRes = JSON.parse(JSON.stringify(o))
             console.log(order)
              let obj ={
                "orderId":order.orderId,
                "productName":prodRes.productName,
                "customer":custRes.customerEmailId,
                "quantity":order.orderQuantity,
                "price":order.orderPrice,
                "address":order.shipmentAddress

              }
              that.list.push(obj)
              console.log(that.list)
            })
        })
        
      })

    })
  }
  trackByIndex = (index:number):number =>{
    return index;
  }



}
