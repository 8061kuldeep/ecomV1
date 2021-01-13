import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/customer/services/api.service';
import { Router } from '@angular/router';
import { TransportService } from 'src/app/shared/services/transport.service';
import { AdminService } from '../../adminservice/admin.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent implements OnInit {
  signup: FormGroup;
  login: FormGroup;
  message: any;
  messagesignup: any;
  isLoading = false;
  constructor(
    private builder: FormBuilder,
    private apiservice: ApiService,
    private router: Router,
    private transport: TransportService,
    private adminService: AdminService
  ) {}
  submit() {
    console.log(this.signup.value);
    this.apiservice.signup(this.signup.value).subscribe(
      (doc) => {
        console.log('working');
        console.log(doc);
        if (doc.message != 'validation failed') {
          this.messagesignup = 'user registered successfully';

          this.signup.reset();
        } else {
          this.messagesignup = doc.data[0].msg;
          setTimeout(() => {
            this.messagesignup = '';
          }, 4000);
        }
      },
      (err) => {
        this.messagesignup = err.data[0].msg;
        setTimeout(() => {
          this.messagesignup = '';
        }, 4000);
      }
    );
  }
  forgotPass() {
    this.router.navigate(['forgotpass']);
  }
  loginCheck() {
    this.isLoading = true;
    console.log(this.login.value);
    this.apiservice.login(this.login.value).subscribe(
      (doc) => {
        localStorage.setItem('cuser', JSON.stringify(doc));
        localStorage.removeItem('admin');

        this.apiservice.settoken();
        this.transport.setTimer();
        this.transport.setAuthStatusListener(true);
        this.adminService.setAdminAuthStatusListner(false);
        this.router.navigate(['category']);
        this.login.reset();
      },
      (err) => {
        this.message = err.error.message;
        this.isLoading = false;
        setTimeout(() => {
          this.message = '';
        }, 4000);
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
    this.signup = this.builder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      profile: ['', [Validators.required]],
    });
  }
}
