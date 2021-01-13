import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../adminservice/admin.service';

@Injectable({
  providedIn: 'root',
})
export class SaveGuard implements CanActivate {
  constructor(private adminService: AdminService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.adminService.getAdminIsAuthorized()) {
      return true;
    } else {
      alert('admin login first!');
      return false;
    }
  }
}
