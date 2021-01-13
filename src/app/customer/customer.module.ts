import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProdetailsComponent } from './components/prodetails/prodetails.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptor/interceptor';

@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent,
    CategoryComponent,
    OrdersComponent,
    ForgotpassComponent,
    UpdatepassComponent,

    ProdetailsComponent,

    HomeComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    CheckoutComponent,
    CartComponent,
    CategoryComponent,
    OrdersComponent,
    ProdetailsComponent,

    UpdatepassComponent,
    ForgotpassComponent,
    HomeComponent,
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CustomerModule {}
