import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  products: any;
  pages: any;
  current: any;
  count: any;
  getOrdersByPage(page) {
    console.log(page + 'ddddddddddddd');
    if (page >= 1 && page <= this.pages) {
      this.apiservice.getOrders(page).subscribe(
        (doc) => {
          console.log(doc);
          this.orders = doc.result;
          this.pages = doc.pages;
          this.current = doc.current;
          this.count = doc.count;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  constructor(private apiservice: ApiService) {
    this.apiservice.getOrders('').subscribe(
      (doc) => {
        console.log(doc);
        this.orders = doc.result;
        this.pages = doc.pages;
        this.current = doc.current;
        this.count = doc.count;
        this;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
