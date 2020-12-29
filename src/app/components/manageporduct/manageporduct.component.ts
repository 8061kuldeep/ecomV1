import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private builder: FormBuilder, private apiservice: ApiService) {
    this.getProducts();
  }
  getProducts() {
    this.apiservice.getProduct().subscribe(
      (doc) => {
        console.log(doc);
        this.products = doc;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(prodId) {
    this.apiservice.deleteProduct(prodId).subscribe(
      (doc) => {
        console.log(doc);
        this.getProducts();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateProduct(prodId) {
    this.btn = 'Update Product';
    this.uid = prodId;
    this.apiservice.getProductById(prodId).subscribe(
      (doc) => {
        console.log(doc);
        console.log('got product');
        this.manageProduct.setValue({
          itemName: doc.itemName,
          price: doc.price,
          description: doc.description,
          category: doc.category,
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
      formData.append('image', this.manageProduct.get('image').value);
      formData.append(
        'description',
        this.manageProduct.get('description').value
      );

      formData.append('category', this.manageProduct.get('category').value);
      console.log(formData);
      this.manageProduct.reset();

      this.apiservice.addProduct(formData).subscribe(
        (doc) => {
          console.log(doc);
          console.log('product  added successfully');
          this.getProducts();
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
      formDataUpdated.append('image', this.manageProduct.get('image').value);
      formDataUpdated.append(
        'description',
        this.manageProduct.get('description').value
      );

      formDataUpdated.append(
        'category',
        this.manageProduct.get('category').value
      );

      this.apiservice.updateProduct(this.uid, formDataUpdated).subscribe(
        (doc) => {
          console.log(doc);
          console.log('product  updated successfully');
          this.getProducts();
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
    this.manageProduct = this.builder.group({
      itemName: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(15)]],
      image: ['', Validators.required],
    });
  }
}
