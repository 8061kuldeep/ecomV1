import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TransportService } from 'src/app/shared/services/transport.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: any;
  count: any = 0;
  categoryList: any;
  message: string;
  btn = 'Add To Cart';
  pages: any;
  prodcount: any;
  current: any;
  category: any = '';
  userCart: any;
  d3: any;
  text: string;
  searchForm: FormGroup;
  constructor(
    public apiservice: ApiService,
    private transport: TransportService,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.listCategory();
    //this.getCart();
    console.log(this.category);
  }
  listCategory() {
    this.apiservice.listCategory().subscribe(
      (doc) => {
        this.categoryList = doc.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCartItemsNumbers() {
    this.apiservice.getCartItemsNumbers().subscribe(
      (doc) => {
        this.count = doc.count;
        console.log(this.count);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCart() {
    this.apiservice.getCart().subscribe(
      (doc) => {
        this.userCart = doc.result[0].cart.items;
        console.log(this.userCart);
        console.log('cart');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getItems(category) {
    this.category = category;
    this.apiservice.getProdByCategory(category, '').subscribe(
      (doc) => {
        if (doc.result.length == 0) {
          this.message = 'No Product Found';
          console.log(doc);
          this.prodcount = doc.count;
          this.current = doc.current;
          this.pages = doc.pages;
          console.log(this.message);
          this.products = [];
        } else {
          this.message = '';
          console.log(doc);
          this.products = doc.result;
          this.prodcount = doc.count;
          this.current = doc.current;
          this.pages = doc.pages;
          console.log(this.products);
        }
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
  getProductsByPageAndCategory(page) {
    if (page >= 1 && page <= this.pages) {
      if (this.category) {
        console.log(this.category + 'cccccccccc');
        this.apiservice.getProdByCategory(this.category, page).subscribe(
          (doc) => {
            this.products = doc.result;
            console.log(doc);
            this.prodcount = doc.count;
            this.current = doc.current;
            this.pages = doc.pages;
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log('get all working');
        this.getProductsByPage(page);
      }
    }
  }
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
  getAllProducts() {
    this.category = '';

    this.apiservice.getAllProducts('').subscribe(
      (doc) => {
        if (doc.result.length == 0) {
          this.message = 'No Products Found';
        } else {
          this.message = '';
          this.products = doc.result;
          console.log(this.products);
          console.log('products');
          this.prodcount = doc.count;
          this.current = doc.current;
          this.pages = doc.pages;
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
            this.message = '';
            this.category = '';
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
    this.getAllProducts();
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
  }
}
