import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminAuthenticated = false;
  private adminAuthStatusListner = new Subject<boolean>();
  token: any;
  obj: any;
  constructor(private http: HttpClient, private router: Router) {}
  getProduct(page): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getProduct/' + page);
  }
  listOrders(page): Observable<any> {
    return this.http.get('http://localhost:3000/admin/listOrders/' + page);
  }
  adminLogin(data): Observable<any> {
    console.log('admin service worked');
    console.log(data);
    return this.http.post('http://localhost:3000/admin/adminLogin', data);
  }
  approveOrder(id, data): Observable<any> {
    return this.http.put(
      'http://localhost:3000/admin/approveOrder/' + id,
      data
    );
  }
  rejectOrder(id, data): Observable<any> {
    return this.http.put('http://localhost:3000/admin/rejectOrder/' + id, data);
  }
  addProduct(data): Observable<any> {
    return this.http.post('http://localhost:3000/admin/addProduct/', data);
  }
  deleteProduct(prodId): Observable<any> {
    return this.http.delete(
      'http://localhost:3000/admin/deleteProduct/' + prodId
    );
  }
  search(s): Observable<any> {
    return this.http.get('http://localhost:3000/admin/search/' + s);
  }
  updateProduct(prodId, data): Observable<any> {
    return this.http.post(
      'http://localhost:3000/admin/updateProduct/' + prodId,
      data
    );
  }
  settoken() {
    this.obj = JSON.parse(localStorage.getItem('admin'));
    if (this.obj) {
      this.token = this.obj.token;
      console.log(this.token + '2222222222222222222222');
    }
  }
  logout() {
    this.adminAuthenticated = false;
    this.adminAuthStatusListner.next(false);
    localStorage.removeItem('admin');
  }
  getToken() {
    return JSON.parse(localStorage.getItem('admin'));
  }
  autoAuthentication() {
    this.obj = JSON.parse(localStorage.getItem('admin'));
    if (this.obj) {
      this.token = this.obj.token;
      this.adminAuthenticated = true;
      console.log(this.adminAuthenticated + 'lllllllllllllllllllllllllll');
      this.adminAuthStatusListner.next(true);
    }
  }
  getCategory(): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getCategory/');
  }
  getCategoryById(id): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getCategory/' + id);
  }
  getCategoryByPage(page): Observable<any> {
    return this.http.get(
      'http://localhost:3000/admin/getCategory/?page=' + page
    );
  }
  addCategory(data): Observable<any> {
    return this.http.post('http://localhost:3000/admin/addCategory', data);
  }
  deleteCategory(catId): Observable<any> {
    return this.http.delete(
      'http://localhost:3000/admin/deleteCategory/' + catId
    );
  }
  getProductById(id): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getProductById/' + id);
  }

  updateCategory(data, id): Observable<any> {
    return this.http.put(
      'http://localhost:3000/admin/updateCategory/' + id,
      data
    );
  }
  getAdminAuthStatusListner() {
    return this.adminAuthStatusListner.asObservable();
  }
  getAdminIsAuthorized() {
    return this.adminAuthenticated;
  }
  setAdminAuthStatusListner(status) {
    if (status) {
      this.adminAuthenticated = true;
    }

    this.adminAuthStatusListner.next(status);
  }
}
