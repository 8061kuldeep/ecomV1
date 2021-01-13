import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../adminservice/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  result: boolean = false;
  constructor(private adminService: AdminService, private router: Router) {
    if (this.adminService.getAdminIsAuthorized()) {
      this.result = true;
    }
  }
  logout() {
    if (confirm('are you sure?')) {
      this.adminService.logout();
    } else {
      this.router.navigate(['admin']);
    }
  }
  ngOnInit(): void {
    this.adminService.settoken();
    this.adminService.getAdminAuthStatusListner().subscribe((result) => {
      this.result = result;
    });
  }
}
