import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../../adminservice/admin.service';

@Component({
  selector: 'app-manageporduct',
  templateUrl: './manageporduct.component.html',
  styleUrls: ['./manageporduct.component.css'],
})
export class ManageporductComponent implements OnInit {
  btn = 'Add Product';
  manageProduct: FormGroup;
  products: any;
  uid: any;
  categoryList: any;
  current: any;
  pages: any;
  count: any;
  page: any;
  searchForm: FormGroup;
  text: string;
  constructor(
    private builder: FormBuilder,

    private adminService: AdminService
  ) {
    this.adminService.getProduct('').subscribe(
      (doc) => {
        console.log(doc);
        this.products = doc.result;
        this.current = doc.current;
        this.pages = doc.pages;
        this.count = doc.count;
      },
      (err) => {
        console.log(err);
      }
    );
    this.listCategory();
  }

  getProductsByPage(page) {
    if (page >= 1 && page <= this.pages) {
      this.page = page;
      this.adminService.getProduct(page).subscribe(
        (doc) => {
          console.log(doc);
          this.products = doc.result;
          this.current = doc.current;
          this.pages = doc.pages;
          this.count = doc.count;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  listCategory() {
    this.adminService.getCategory().subscribe(
      (doc) => {
        console.log(doc);
        this.categoryList = doc.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(prodId) {
    this.adminService.deleteProduct(prodId).subscribe(
      (doc) => {
        console.log(doc);
        this.getProductsByPage(this.page);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateProduct(prodId) {
    this.btn = 'Update Product';
    this.uid = prodId;
    this.adminService.getProductById(prodId).subscribe(
      (doc) => {
        console.log(doc);
        console.log('got product');
        this.manageProduct.setValue({
          itemName: doc.itemName,
          price: doc.price,
          stock: doc.stock,
          category: doc.category,
          description: doc.description,
          image: doc.image,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submit() {
    if (this.btn == 'Add Product') {
      let formData = new FormData();
      formData.append('itemName', this.manageProduct.get('itemName').value);

      formData.append('price', this.manageProduct.get('price').value);
      formData.append('stock', this.manageProduct.get('stock').value);
      formData.append('image', this.manageProduct.get('image').value);
      formData.append(
        'description',
        this.manageProduct.get('description').value
      );

      formData.append('category', this.manageProduct.get('category').value);
      console.log(formData);
      this.manageProduct.reset();

      this.adminService.addProduct(formData).subscribe(
        (doc) => {
          console.log(doc);
          console.log('product  added successfully');
          this.getProductsByPage(this.page);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('updating');
      let formDataUpdated = new FormData();
      formDataUpdated.append(
        'itemName',
        this.manageProduct.get('itemName').value
      );
      formDataUpdated.append('price', this.manageProduct.get('price').value);
      formDataUpdated.append('stock', this.manageProduct.get('stock').value);
      formDataUpdated.append('image', this.manageProduct.get('image').value);
      formDataUpdated.append(
        'description',
        this.manageProduct.get('description').value
      );

      formDataUpdated.append(
        'category',
        this.manageProduct.get('category').value
      );

      this.adminService.updateProduct(this.uid, formDataUpdated).subscribe(
        (doc) => {
          console.log(doc);
          console.log('product  updated successfully');
          this.getProductsByPage(this.page);
          this.manageProduct.reset();
          this.btn = 'Add Product';
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file.name);
      this.manageProduct.get('image').setValue(file);
    }
  }
  ngOnInit(): void {
    this.searchForm = this.builder.group({
      search: ['', Validators.required],
    });
    this.searchForm.get('search').valueChanges.subscribe((s) => {
      this.adminService.search(s).subscribe(
        (products) => {
          if (products.result.length == 0) {
            this.text = 'no product found!';
            this.products = [];
          } else {
            this.text = '';
            console.log(this.products.length);
            this.products = products.result;
            console.log(this.products);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
    this.manageProduct = this.builder.group({
      itemName: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(15)]],
      image: ['', Validators.required],
    });
  }
}
