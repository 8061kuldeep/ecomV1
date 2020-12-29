import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotpassComponent implements OnInit {
  vEmail: FormGroup;
  token: any;
  message: any;
  constructor(private builder: FormBuilder, private apiservice: ApiService) {}
  verify() {
    console.log(this.vEmail.value);
    this.apiservice.forgotPassword(this.vEmail.value.email).subscribe(
      (doc) => {
        console.log(doc);
        this.message = doc.message;
        console.log(doc.token);
        this.token = doc.token;

        this.vEmail.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.vEmail = this.builder.group({
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
