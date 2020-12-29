import { Component, ViewChild, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TransportService } from './services/transport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private transport: TransportService) {}
  title = 'Ecommerce';
  ngOnInit() {
    this.transport.autoAuthUser();
  }
}
