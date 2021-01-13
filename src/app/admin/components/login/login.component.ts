import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../adminservice/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  isLoding = false;

  constructor(
    private builder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}
  loginCheck() {
    this.isLoding = true;
    console.log(this.login.value);
    this.adminService.adminLogin(this.login.value).subscribe(
      (result) => {
        if (result) {
          this.isLoding = false;
          this.router.navigate(['admin/manageProd']);
        }
        console.log('loged in');

        setTimeout(() => {
          this.adminService.logout();
          this.router.navigate(['']);
        }, 360000);
        localStorage.setItem('admin', JSON.stringify(result));
        localStorage.removeItem('cuser');
        this.adminService.setAdminAuthStatusListner(true);
      },
      (err) => {
        this.isLoding = false;
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.login = this.builder.group({
      password: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
}
