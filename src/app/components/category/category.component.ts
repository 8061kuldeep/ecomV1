import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: any;
  count: any = 0;

  constructor(
    public apiservice: ApiService,
    private transport: TransportService
  ) {}
  getCartItemsNumbers() {
    this.apiservice.getCartItemsNumbers().subscribe(
      (doc) => {
        this.count = doc.count;
        console.log(this.count + 'fffffffffffffffff');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getclothes() {
    this.apiservice.getProdByCategory('clothes').subscribe(
      (doc) => {
        this.products = doc.result;
        console.log('get clothes');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getelectronics() {
    this.apiservice.getProdByCategory('electronics').subscribe(
      (doc) => {
        this.products = doc.result;
        console.log('get electronics');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addtocart(prodId) {
    console.log(prodId);
    this.apiservice.addToCart(prodId).subscribe(
      (doc) => {
        console.log('added to cart');
        this.apiservice.getCartItemsNumbers().subscribe(
          (doc) => {
            this.count = doc.count;
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
  getjewellery() {
    this.apiservice.getProdByCategory('jewellery').subscribe(
      (doc) => {
        this.products = doc.result;
        console.log('get jewellery');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    if (this.transport.getIsAuth()) {
      this.apiservice.getCartItemsNumbers().subscribe(
        (doc) => {
          this.count = doc.count;
          this.transport.sendcount(this.count);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.apiservice.getAllProducts().subscribe(
      (doc) => {
        this.products = doc.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
