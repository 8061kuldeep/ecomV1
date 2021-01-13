import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../../adminservice/admin.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements OnInit {
  category: FormGroup;
  catdetails: any;
  message: string;
  catId: any;
  btn: string = 'Add Category';
  current: any;
  count: any;
  pages: any;
  page: any = 1;
  constructor(
    private builder: FormBuilder,
    private adminService: AdminService
  ) {
    this.getCategory();
  }

  submit() {
    if (this.btn == 'Add Category') {
      console.log(this.category.value);
      this.adminService.addCategory(this.category.value).subscribe(
        (result) => {
          this.message = 'category added successfully';
          this.category.reset();
          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.getCategory();
          this.getCategoryByPage(this.page);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.adminService
        .updateCategory(this.category.value, this.catId)
        .subscribe(
          (result) => {
            this.category.reset();
            this.getCategoryByPage(this.page);
            console.log();
            this.btn = 'Add Category';
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  update(id) {
    this.catId = id;
    console.log(id);
    this.adminService.getCategoryById(id).subscribe(
      (doc) => {
        console.log(doc);
        console.log(doc.result[0].category);
        let obj = { category: doc.result[0].category };
        this.category.setValue(obj);
        this.btn = 'Update Category';
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(id) {
    console.log(id);
    this.adminService.deleteCategory(id).subscribe(
      (result) => {
        this.getCategoryByPage(this.page);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCategoryByPage(page) {
    this.page = page;
    if (page >= 1 && page <= this.pages) {
      this.adminService.getCategoryByPage(page).subscribe(
        (result) => {
          console.log(result);

          this.catdetails = result.result;
          this.current = result.current;
          this.count = result.count;
          this.pages = result.pages;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  getCategory() {
    this.adminService.getCategoryByPage('').subscribe(
      (result) => {
        console.log(result);
        this.catdetails = result.result;
        this.current = result.current;
        this.count = result.count;
        this.pages = result.pages;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.category = this.builder.group({
      category: ['', Validators.required],
    });
  }
}
