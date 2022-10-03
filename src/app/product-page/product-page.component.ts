import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EcomServiceService } from '../ecom-service.service';
import { EcomDataService } from '../ecom-data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  quantity:any;
  constructor(private api:EcomServiceService,private formbuilder:FormBuilder, private router:Router,private dataservice:EcomDataService) { }
  products:any;
  categories:any;
  list:any[]=[]
  ngOnInit(): void {
    this.getAllCategory()
    this.getAllProducts()
  }
  myCatForm: FormGroup = this.formbuilder.group({
     mySelect: [, []],
  })
  getAllProducts()
  {
    let productUrl ="https://localhost:44309/api/ApiGateway/allproducts"
    this.api.get(productUrl).subscribe(res=>{
      this.products=JSON.parse(JSON.stringify(res))
      let that =this;
      this.products.forEach(function(prod:any){
        let categoryId=prod.categoryId;
        let catUrl= `https://localhost:44309/api/ApiGateway/getctaegorybyId?id=${categoryId}`
        that.api.post(catUrl).subscribe(response=>{
          let catRes = JSON.parse(JSON.stringify(response))
          let catName = catRes.categoryName;
          that.list.push({...prod,catName
          })
          console.log("list",that.list)
        })
      })
    })
  }

  trackByIndex = (index:number):number =>{
    return index;
  }

  getAllCategory()
  {
    this.api.get("https://localhost:44309/api/ApiGateway/allcategories").subscribe(res=>{
      this.categories=res;
      console.log(this.categories)
    })
  }

  filter()
  {
    
    this.list = this.list.filter(obj =>{
      return obj.categoryId ==parseInt(this.myCatForm.value.mySelect)
    })
    
  }

  buy(index:number)
  {
    this.dataservice.setObject(this.list[index])
    this.router.navigateByUrl('/payment');
  }




}
