import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { TransportService } from 'src/app/shared/services/transport.service';
import { ProdetailsComponent } from 'src/app/customer/components/prodetails/prodetails.component';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ProdetailsComponent) proDetails: ProdetailsComponent;
  searchForm: FormGroup;
  products: any;
  count: any;
  current: any;
  pages: any;
  text: string;
  constructor(
    private apiservice: ApiService,
    private transport: TransportService,
    private router: Router,
    private builder: FormBuilder
  ) {}
  view(id) {}
  getProductsByPage(page) {
    if (page >= 1 && page <= this.pages) {
      this.apiservice.getAllProducts(page).subscribe(
        (doc) => {
          this.products = doc.result;
          console.log(doc);
          this.count = doc.count;
          this.current = doc.current;
          this.pages = doc.pages;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  ngOnInit(): void {
    this.searchForm = this.builder.group({
      search: ['', Validators.required],
    });
    this.searchForm.get('search').valueChanges.subscribe((s) => {
      this.apiservice.search(s).subscribe(
        (products) => {
          if (products.result.length == 0) {
            this.text = 'no product found!';
            this.products = [];
          } else {
            this.text = '';
            console.log(this.products.length);
            this.products = products.result;
            console.log(this.products);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
    this.apiservice.getAllProducts('').subscribe(
      (doc) => {
        this.products = doc.result;
        console.log(doc);
        this.count = doc.count;
        this.current = doc.current;
        this.pages = doc.pages;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
