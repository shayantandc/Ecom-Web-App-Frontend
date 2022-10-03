import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login-Register/login/login.component';
import { RegisterComponent } from './Login-Register/register/register.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full'},
  { path: 'home', component:AppComponent},
  { path: 'AddProduct', component:AddProductComponent},
  { path: 'AddCategory', component:AddCategoryComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'product', component:ProductPageComponent},
  { path: 'payment', component:PaymentComponent},
  { path: 'myorders', component:MyOrdersComponent},
  { path: 'adminhome', component:AdminHomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
