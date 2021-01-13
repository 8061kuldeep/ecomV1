import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderlistingComponent } from './components/orderlisting/orderlisting.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ManageporductComponent } from './components/manageporduct/manageporduct.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { AdminService } from './adminservice/admin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { adminInterceptor } from './interceptor/admin-interceptor';
import { HomeComponent } from './components/home/home.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
@NgModule({
  declarations: [
    DashboardComponent,
    OrderlistingComponent,
    LoginComponent,
    ManageporductComponent,
    CategoryManagementComponent,
    HomeComponent,
    CreateuserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: adminInterceptor, multi: true },
  ],
})
export class AdminModule {}
