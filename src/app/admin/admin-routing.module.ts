import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { OrderlistingComponent } from './components/orderlisting/orderlisting.component';
import { ManageporductComponent } from './components/manageporduct/manageporduct.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { AdminGuard } from './adminguard/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { SaveGuard } from './adminguard/save.guard';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { SigninComponent } from '../shared/components/signin/signin.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'orderListing',
        canActivate: [SaveGuard, AdminGuard],
        component: OrderlistingComponent,
      },

      {
        path: 'manageProd',
        canActivate: [SaveGuard, AdminGuard],
        component: ManageporductComponent,
      },
      {
        path: 'categoryManagement',
        canActivate: [SaveGuard, AdminGuard],
        component: CategoryManagementComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'createUser',
        component: SigninComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
