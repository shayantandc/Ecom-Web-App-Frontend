import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcomServiceService } from 'src/app/ecom-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private api: EcomServiceService, private router:Router) {}
  RegisterForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required]],

    address: ['', [Validators.required]],

    email: ['', [Validators.required]],

    phone: ['', [Validators.required]],

    password: ['', [Validators.required]],

    confirmpassword: ['', [Validators.required]],
  });
  ngOnInit(): void {}
  AddCustomer() {
    //console.log(this.RegisterForm);
    if (this.RegisterForm.status == 'VALID') {
      if (this.RegisterForm.value.password ==this.RegisterForm.value.confirmpassword){
        let login = {
          userEmail:this.RegisterForm.value.email,
        password:this.RegisterForm.value.password,
        loginRole:"User"
        }
        this.api.post(`https://localhost:44309/api/ApiGateway/addlogin`,login).subscribe(response=>{
        //console.log(response);
        var res = JSON.parse(JSON.stringify(response))
         var login_Id = res.loginId ;
         console.log(login_Id)
         console.log("hello")
         let customer = {
          loginId : login_Id,
          customerName : this.RegisterForm.value.name,
          customerAddress:this.RegisterForm.value.address,
          customerPhoneNumber : this.RegisterForm.value.phone,
          customerEmailId :this.RegisterForm.value.email,
        }
        console.log(login_Id)
        this.api.post(`https://localhost:44309/api/ApiGateway/addcustomer`,customer).subscribe(response=>{
            console.log(response);
            alert("User Created");
            var res = JSON.parse(JSON.stringify(response))
            console.log(res)
            this.router.navigateByUrl('/login');
          })
    
      })
      /*
      "loginId": 113,
  "customerName": "qwert",
  "customerAddress": "qwerty",
  "customerPhoneNumber": "qwerty",
  "customerEmailId": "qwertgyhu"
      */

   
      }
      else{
        alert("Password Mismatch");
      }
         
    }
    else{
      alert("Fill all Fields");
    }
  }
}
