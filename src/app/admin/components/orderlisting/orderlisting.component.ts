import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../adminservice/admin.service';

@Component({
  selector: 'app-orderlisting',
  templateUrl: './orderlisting.component.html',
  styleUrls: ['./orderlisting.component.css'],
})
export class OrderlistingComponent implements OnInit {
  orders: any;
  pages: any;
  current: any;
  count: any;
  page: any = 1;
  constructor(private adminService: AdminService) {
    this.adminService.listOrders('').subscribe(
      (doc) => {
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
  approve(id) {
    this.adminService.approveOrder(id, '').subscribe(
      (doc) => {
        console.log(doc);
        this.getOrdersByPage(this.page);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  reject(id) {
    this.adminService.rejectOrder(id, '').subscribe(
      (doc) => {
        console.log(doc);
        this.getOrdersByPage(this.page);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getOrdersByPage(page) {
    this.page = page;
    if (page >= 1 && page <= this.pages) {
      this.adminService.listOrders(page).subscribe(
        (doc) => {
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
  ngOnInit(): void {}
}
