import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcomServiceService } from 'src/app/ecom-service.service';
import { environment } from 'src/environments/environment';
import { CatService } from './catservice';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private formbuilder:FormBuilder, public api:EcomServiceService) { }
  url ="https://localhost:44309/api/ApiGateway/addcategory";
  formSubmited=false;
  added=false;
  amount=500;
  categories:any;
  myForm: FormGroup = this.formbuilder.group({
    catname: ["", [Validators.required]]
    
    
  })
  //posts: CatService[] = [];
  

  ngOnInit(): void {
    this.getAllCategory()
  }
  
  getAllCategory()
  {
    let allCategories = environment.getAllCategories
    this.api.get(allCategories).subscribe((res:any)=>{
      this.categories=res;
      console.log(this.categories)
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
        categoryName:this.myForm.value.catname
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
