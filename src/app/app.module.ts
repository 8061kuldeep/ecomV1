import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/signin/signin.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProdetailsComponent } from './components/prodetails/prodetails.component';
import { ApiService } from './services/api.service';
import { TransportService } from './services/transport.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthInterceptor } from './interceptor/interceptor';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ManageporductComponent } from './components/manageporduct/manageporduct.component';
import { errorInterceptor } from './interceptor/error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './components/error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CheckoutComponent,
    CartComponent,
    SigninComponent,
    CategoryComponent,
    ProdetailsComponent,
    OrdersComponent,
    UpdatepassComponent,
    ForgotpassComponent,
    ManageporductComponent,
    PagenotfoundComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    ApiService,
    TransportService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
