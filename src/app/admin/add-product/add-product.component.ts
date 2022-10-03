import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcomServiceService } from 'src/app/ecom-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private formbuilder:FormBuilder, public api:EcomServiceService) { }
  url ="https://localhost:44309/api/ApiGateway/addproduct";
  formSubmited=false;
  added=false;
  amount=500;
  prods:any;
  myForm: FormGroup = this.formbuilder.group({
    id: ["", [Validators.required]],
    name: ["", [Validators.required]],
    type: ["", [Validators.required]],
    price: ["", [Validators.required]],
    desc:["", [Validators.required]],
    
  })

  ngOnInit(): void {
    this.getAllProds()
    
  }

  getAllProds()
  {
    let allProducts = environment.getAllProducts
    this.api.get(allProducts).subscribe((res:any)=>{
      this.prods=res;
      console.log(this.prods)
    })
  }

  trackByIndex = (index:number):number =>{
    return index;
  }

  validateForm()
  {
    console.log(this.myForm)
    if(this.myForm.status == "VALID")
    {
      
      let body ={
        categoryId:this.myForm.value.id,
        productName:this.myForm.value.name,
        productType:this.myForm.value.type,
        productPrice:this.myForm.value.price,
        productDescription:this.myForm.value.desc,
        
      }
      
      this.api.post(this.url,body).subscribe(res=>{
        console.log(res)
        alert("posted successfully")
      })
      

      
    }else{
      alert('All Fields are Required');
      
    }


}
}
