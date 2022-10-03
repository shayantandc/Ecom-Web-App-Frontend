import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './Login-Register/login/login.component';
import { RegisterComponent } from './Login-Register/register/register.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { PaymentComponent } from './payment/payment.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { EcomInterceptorInterceptor } from './ecom-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductPageComponent,
    PaymentComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    ReactiveFormsModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    
      useClass:EcomInterceptorInterceptor,
    
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
