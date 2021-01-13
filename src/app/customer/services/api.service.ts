import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: any;
  obj: any;
  cuser: any;
  constructor(private http: HttpClient) {}

  settoken() {
    this.obj = JSON.parse(localStorage.getItem('cuser'));
    if (this.obj) {
      this.token = this.obj.token;
    }
    console.log(this.token);
    console.log(typeof this.token);
  }
  listCategory(): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getCategory');
  }
  getAllProducts(page): Observable<any> {
    return this.http.get('http://localhost:3000/getProducts/?page=' + page);
  }

  forgotPassword(email): Observable<any> {
    console.log(email);
    console.log('apiservice');
    return this.http.get('http://localhost:3000/forgotPassword/' + email);
  }

  updatePassword(token, data): Observable<any> {
    console.log(token);
    console.log('apiservice token');
    return this.http.put('http://localhost:3000/updatePassword/' + token, data);
  }

  getProdByCategory(category, page): Observable<any> {
    return this.http.get(
      'http://localhost:3000/getProducts/' + category + '/?page=' + page
    );
  }

  getProductById(id): Observable<any> {
    return this.http
      .get<any>('http://localhost:3000/getProductById/' + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.error || 'server error');
  }

  signup(data): Observable<any> {
    return this.http
      .post('http://localhost:3000/signup/', data)
      .pipe(catchError(this.errorHandler));
  }

  login(data): Observable<any> {
    return this.http.post('http://localhost:3000/login/', data);
  }

  addToCart(prodId): Observable<any> {
    return this.http.post('http://localhost:3000/addToCart/' + prodId, prodId);
  }

  getOrders(page): Observable<any> {
    return this.http.get('http://localhost:3000/getOrders/' + page);
  }

  test() {
    return JSON.parse(localStorage.getItem('cuser'));
  }

  deleteItemFromCart(prodId): Observable<any> {
    return this.http.delete(
      'http://localhost:3000/deleteItemFromCart/' + prodId
    );
  }
  search(s): Observable<any> {
    return this.http.get('http://localhost:3000/search/' + s);
  }

  increaseCount(prodId): Observable<any> {
    console.log('increase in sservice');
    console.log(prodId);
    return this.http.put(
      'http://localhost:3000/increaseCount/' + prodId,
      prodId
    );
  }

  order(data): Observable<any> {
    return this.http.post('http://localhost:3000/order', data);
  }
  decreaseCount(prodId): Observable<any> {
    console.log('decrease in sservice' + prodId);
    return this.http.put(
      'http://localhost:3000/decreaseCount/' + prodId,
      prodId
    );
  }
  getCart(): Observable<any> {
    return this.http.get('http://localhost:3000/getCart/');
  }
  getCartItemsNumbers(): Observable<any> {
    return this.http.get('http://localhost:3000/getCartItemsNumbers/');
  }

  // addProduct(data): Observable<any> {
  //   return this.http.post('http://localhost:3000/admin/addProduct/', data);
  // }

  // updateProduct(prodId, data): Observable<any> {
  //   return this.http.post(
  //     'http://localhost:3000/admin/updateProduct/' + prodId,
  //     data
  //   );
  // }

  // getProduct(): Observable<any> {
  //   return this.http.get('http://localhost:3000/admin/getProduct/');
  // }

  // deleteProduct(prodId): Observable<any> {
  //   return this.http.delete(
  //     'http://localhost:3000/admin/deleteProduct/' + prodId
  //   );
  // }
}
