import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from 'src/app/shared/services/transport.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userCart: any;
  count: any;
  total: any;
  gtotal: any;
  deleteItemFromCart(prodId) {
    console.log(prodId + 'lllllllllllllllooollllllllllll');
    this.apiservice.deleteItemFromCart(prodId).subscribe(
      (doc) => {
        console.log('item deleted');
        this.getCart();
        this.apiservice.getCartItemsNumbers().subscribe(
          (doc) => {
            this.count = doc.count;
            this.total = doc.total;
            this.gtotal = doc.total + 2;
            this.transport.sendcount(this.count);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  constructor(
    private apiservice: ApiService,
    private transport: TransportService,
    private router: Router
  ) {}
  checkout() {
    this.router.navigate(['checkout']);
  }
  getCart() {
    this.apiservice.getCart().subscribe(
      (doc) => {
        console.log(doc);
        this.userCart = doc.result[0].cart.items;
        console.log(this.userCart);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  increaseCount(prodId) {
    console.log(prodId);
    this.apiservice.increaseCount(prodId).subscribe(
      (doc) => {
        console.log('count increased');
        this.getCart();
        this.apiservice.getCartItemsNumbers().subscribe(
          (doc) => {
            this.count = doc.count;

            this.total = doc.total;
            this.gtotal = doc.total + 2;
            this.transport.sendcount(this.count);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  decreaseCount(prodId) {
    console.log(prodId);

    this.apiservice.decreaseCount(prodId).subscribe(
      (doc) => {
        console.log('count decreased ');
        this.getCart();
        this.apiservice.getCartItemsNumbers().subscribe(
          (doc) => {
            this.count = doc.count;
            this.total = doc.total;
            this.gtotal = doc.total + 2;
            this.transport.sendcount(this.count);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.getCart();
    this.apiservice.getCartItemsNumbers().subscribe(
      (doc) => {
        this.count = doc.count;
        this.total = doc.total;
        this.gtotal = doc.total + 2;
        this.transport.sendcount(this.count);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
