import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CategoryComponent } from './components/category/category.component';
import { ProdetailsComponent } from './components/prodetails/prodetails.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ProtectGuard } from './protect.guard';
import { ManageporductComponent } from './components/manageporduct/manageporduct.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [ProtectGuard],
    component: CartComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'checkout',
    canActivate: [ProtectGuard],
    component: CheckoutComponent,
  },
  {
    path: 'orders',
    canActivate: [ProtectGuard],
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

    component: CategoryComponent,
  },
  {
    path: 'prodetails/:id',

    component: ProdetailsComponent,
  },
  {
    path: 'manageproduct',

    component: ManageporductComponent,
  },
  // {
  //   path: '**',

  //   component: PagenotfoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
