import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TransportService } from 'src/app/services/transport.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  userCart: any;
  count: any;
  total: any;
  gtotal: any;
  message: string;
  order: FormGroup;
  deleteItemFromCart(prodId) {
    console.log(prodId + 'lllllllllllllllllllllllllll');
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
    private builder: FormBuilder
  ) {}
  getCart() {
    this.apiservice.getCart().subscribe(
      (doc) => {
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
  orderNow() {
    this.apiservice.order('nothing').subscribe(
      (doc) => {
        console.log('ordered successfully');
        this.getCart();
        this.apiservice.getCartItemsNumbers().subscribe(
          (doc) => {
            this.count = doc.count;
            this.message = 'ordered successfully';

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
    this.order = this.builder.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
    });
    setTimeout(() => {
      this.message = '';
    }, 3000);
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
