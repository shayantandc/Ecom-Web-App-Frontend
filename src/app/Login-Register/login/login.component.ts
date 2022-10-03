import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcomDataService } from 'src/app/ecom-data.service';
import { EcomServiceService } from 'src/app/ecom-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dataservice:EcomDataService,private formbuilder:FormBuilder,private api:EcomServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  myForm: FormGroup = this.formbuilder.group({
    email: ["", [Validators.required]],
    password:["", [Validators.required]],
  
  })


  send()
  {
    if(this.myForm.status=='VALID')
    {
      this.api.post(`https://localhost:44309/api/ApiGateway/getloginbyId?mail=${this.myForm.value.email}`).subscribe(res=>{
        if(res==null)
        {
          alert("User Not Registered");
        }else{
          console.log(res);
          let response = JSON.parse(JSON.stringify(res));
          if(response.password == this.myForm.value.password)
          {
            let loginId = response.loginId;
            let customerUrl = `https://localhost:44309/api/ApiGateway/getcustomerbyLoginId?id=${loginId}`
            this.api.post(customerUrl).subscribe(r=>{
              let custRes = JSON.parse(JSON.stringify(r));
              console.log("cust",custRes);
              let body = {
                loginId:response.loginId,
                loginRole:response.loginRole,
                token:response.token,
                userId:response.userId,
                customerId:custRes.customerId,
                address:custRes.customerAddress
              }
              localStorage.setItem('User', JSON.stringify(body));
              this.dataservice.setUser(body)
              this.router.navigateByUrl('');
              
            })
            
          }else{
            alert("Invalid Credentials")
          }
        }
      })

    }else{
      alert("All Field Are Required")
    }

  }





}
