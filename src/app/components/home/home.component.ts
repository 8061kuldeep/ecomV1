import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ProdetailsComponent } from '../prodetails/prodetails.component';
import { TransportService } from 'src/app/services/transport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ProdetailsComponent) proDetails: ProdetailsComponent;
  products: any;
  constructor(
    private apiservice: ApiService,
    private transport: TransportService,
    private router: Router
  ) {}
  view(id) {}

  ngOnInit(): void {
    this.apiservice.getAllProducts().subscribe((doc) => {
      this.products = doc.result;
    }),
      (err) => {
        console.log(err);
      };
  }
}
