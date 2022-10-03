import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';



@NgModule({
  declarations: [
    AddProductComponent,
    AddCategoryComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule

  ]
})
export class AdminModule { }
