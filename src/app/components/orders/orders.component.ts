import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  products: any;
  constructor(private apiservice: ApiService) {
    this.apiservice.getOrders().subscribe(
      (doc) => {
        this.orders = doc;
        console.log(this.orders);
        console.log(this.orders[3].products);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
