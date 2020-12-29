import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from 'src/app/services/transport.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prodetails',
  templateUrl: './prodetails.component.html',
  styleUrls: ['./prodetails.component.css'],
})
export class ProdetailsComponent implements OnInit, OnDestroy {
  product: any;
  condition = false;
  id: any;
  authListenerSubs: Subscription;
  count: any;
  btn: String = 'Add to cart';
  result = false;
  constructor(
    public apiservice: ApiService,
    private acticve: ActivatedRoute,
    private transport: TransportService
  ) {
    this.viewProduct();
  }
  viewProduct() {
    this.id = this.acticve.snapshot.params.id;
    this.apiservice.getProductById(this.id).subscribe(
      (product) => {
        this.product = product;
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
        this.btn = 'added to cart';
        this.condition = true;
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
  ngOnInit(): void {
    this.authListenerSubs = this.transport
      .getAuthStatusListener()
      .subscribe((status) => {
        this.result = status;
      });
    this.result = this.transport.getIsAuth();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
