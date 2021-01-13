import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  cuser: any;
  token: any;
  constructor(private apiservice: ApiService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.apiservice.test()) {
      this.cuser = this.apiservice.test();
      this.token = this.cuser.token;
      console.log('interceptor working');
      console.log(this.token + 'jjjjjj');
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
      });

      this.cuser = this.apiservice.test();

      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
