import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminService } from '../adminservice/admin.service';
@Injectable()
export class adminInterceptor implements HttpInterceptor {
  admintoken: any;
  constructor(private adminService: AdminService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.adminService.getToken()) {
      this.adminService.setAdminAuthStatusListner(true);
      this.admintoken = this.adminService.getToken().token;
      const adminRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.admintoken),
      });
      return next.handle(adminRequest);
    } else {
      return next.handle(req);
    }
  }
}
