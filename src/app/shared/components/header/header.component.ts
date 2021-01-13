import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransportService } from '../../services/transport.service';
import { ApiService } from 'src/app/customer/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authListenerSubs: Subscription;
  count: any;
  result = false;
  constructor(
    private transport: TransportService,
    public apiservice: ApiService,
    private router: Router
  ) {
    this.apiservice.settoken();
    this.transport.transportEvent.subscribe((count) => {
      this.count = count;
    });
  }
  logout() {
    if (confirm('are you sure')) {
      this.transport.logout();

      this.router.navigate(['']);
    } else {
      this.router.navigate(['category']);
    }
  }

  getCartItemsNumbers() {
    this.transport.transportEvent.subscribe((count) => {
      this.count = count;
    });
  }

  ngOnInit(): void {
    this.result = this.transport.getIsAuth();
    if (this.result) {
      this.apiservice.getCartItemsNumbers().subscribe(
        (doc) => {
          this.count = doc.count;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if (this.result) {
      this.getCartItemsNumbers();
    }
    this.authListenerSubs = this.transport
      .getAuthStatusListener()
      .subscribe((status) => {
        this.result = status;
      });
  }
  ngOnDestroy() {}
}
