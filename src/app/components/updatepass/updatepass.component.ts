import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css'],
})
export class UpdatepassComponent implements OnInit {
  updatepass: FormGroup;
  token: any;
  message: string;
  constructor(
    private builder: FormBuilder,
    private activate: ActivatedRoute,
    private apiservice: ApiService
  ) {}
  update() {
    console.log(this.updatepass.value);
    this.apiservice.updatePassword(this.token, this.updatepass.value).subscribe(
      (doc) => {
        console.log(doc);
        this.message = doc.message;
      },
      (err) => {
        console.log(err);
      }
    );
    this.updatepass.reset();
  }
  ngOnInit(): void {
    this.token = this.activate.snapshot.params.token;
    console.log(this.token + 'kkkkkkkkkkkkkk');
    this.updatepass = this.builder.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
