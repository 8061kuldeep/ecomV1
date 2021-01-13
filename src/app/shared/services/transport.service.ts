import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  cuser: any;
  tokenTimer: any;
  isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  transportEvent: EventEmitter<any> = new EventEmitter();
  timer: any;
  obj: any;
  token: any;

  sendcount(count) {
    console.log('count set');
    console.log(count);
    this.transportEvent.emit(count);
  }
  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  logout() {
    clearTimeout(this.timer);
    localStorage.removeItem('cuser');
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
  }
  setTimer() {
    this.timer = setTimeout(() => {
      this.logout();
    }, 3600000);
  }
  autoAuthUser() {
    this.obj = JSON.parse(localStorage.getItem('cuser'));
    if (this.obj) {
      this.token = this.obj.token;
      this.isAuthenticated = true;
      this.authStatusListner.next(true);
    }
  }
  setAuthStatusListener(status) {
    if (status) {
      this.isAuthenticated = true;
    }
    this.authStatusListner.next(status);
  }

  constructor() {}
}
