import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
  myData:any;
  role="visitor";
  login=false;

  ngOnInit(): void {
     this.myData = JSON.parse(localStorage.getItem('User')||"{}");
     
     this.role=this.myData.loginRole;
     if(this.myData.loginRole)
     {
      this.login=true
      this.role=this.myData.loginRole;
      
     }else{
      this.login=false;
      
     }

     console.log("LOGINNNNN",this.login)
     console.log("ROLEEEE",this.role)

  }

  logout()
  {
    localStorage.clear();
    this.router.navigateByUrl('');
    window.location.reload();

  }


}
