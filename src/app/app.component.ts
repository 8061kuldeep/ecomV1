import { Component, ViewChild, OnInit } from '@angular/core';
import { TransportService } from './shared/services/transport.service';
import { AdminService } from './admin/adminservice/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private transport: TransportService,
    private adminService: AdminService
  ) {}
  title = 'Ecommerce';
  ngOnInit() {
    this.transport.autoAuthUser();
    this.adminService.autoAuthentication();
  }
}
