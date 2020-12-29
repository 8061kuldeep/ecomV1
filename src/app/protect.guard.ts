import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { TransportService } from './services/transport.service';

@Injectable({
  providedIn: 'root',
})
export class ProtectGuard implements CanActivate {
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private transport: TransportService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.transport.getIsAuth()) {
      return true;
    } else {
      alert('login first');
      this.router.navigate(['signin']);
      return false;
    }
  }
}
