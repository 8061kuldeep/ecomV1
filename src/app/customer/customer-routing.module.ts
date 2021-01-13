import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';

import { CategoryComponent } from './components/category/category.component';
import { ProdetailsComponent } from './components/prodetails/prodetails.component';
import { CustomerGuard } from './customer-guard/customer.guard';
import { ProtectGuard } from './guards/protect.guard';
import { SigninComponent } from '../shared/components/signin/signin.component';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [ProtectGuard, CustomerGuard],
    component: CartComponent,
  },
  {
    path: '',
    canActivate: [CustomerGuard],
    component: HomeComponent,
  },
  {
    path: 'signin',
    canActivate: [CustomerGuard, CustomerGuard],
    component: SigninComponent,
  },
  {
    path: 'checkout',
    canActivate: [ProtectGuard, CustomerGuard],
    component: CheckoutComponent,
  },
  {
    path: 'orders',
    canActivate: [ProtectGuard, CustomerGuard],
    component: OrdersComponent,
  },
  {
    path: 'updatepassword/:token',

    component: UpdatepassComponent,
  },
  {
    path: 'forgotpass',

    component: ForgotpassComponent,
  },
  {
    path: 'category',
    canActivate: [CustomerGuard],
    component: CategoryComponent,
  },

  {
    path: 'prodetails/:id',
    canActivate: [CustomerGuard],
    component: ProdetailsComponent,
  },

  // {
  //   path: '**',

  //   component: PagenotfoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
