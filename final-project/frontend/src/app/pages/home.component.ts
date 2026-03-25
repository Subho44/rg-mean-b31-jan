import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../components/product-form.component';
import { ProductTableComponent } from '../components/product-table.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductTableComponent],
  template: `
    <div class="container">
      <div class="row justify-content-center mb-3">
        <div class="col-lg-10">
          <div *ngIf="message" class="alert alert-info">{{ message }}</div>

          <app-product-form
            [formData]="formData"
            [editId]="editId"
            (submitProduct)="saveProduct()"
            (cancel)="cancelEdit()"
          ></app-product-form>

          <app-product-table
            [products]="products"
            (edit)="editProduct($event)"
            (remove)="deleteProduct($event)"
          ></app-product-table>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);

  products: Product[] = [];
  formData: Product = {
    name: '',
    price: null
  };
  editId: string | null = null;
  message = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        this.message = 'Unable to load products. Please login again.';
      }
    });
  }

  saveProduct(): void {
    this.message = '';

    if (!this.formData.name || this.formData.price === null) {
      this.message = 'Please fill all fields.';
      return;
    }

    if (this.editId) {
      this.productService.updateProduct(this.editId, this.formData).subscribe({
        next: () => {
          this.message = 'Product updated successfully.';
          this.resetForm();
          this.loadProducts();
        },
        error: () => {
          this.message = 'Update failed.';
        }
      });
      return;
    }

    this.productService.addProduct(this.formData).subscribe({
      next: () => {
        this.message = 'Product added successfully.';
        this.resetForm();
        this.loadProducts();
      },
      error: () => {
        this.message = 'Add product failed.';
      }
    });
  }

  editProduct(product: Product): void {
    this.formData = {
      name: product.name,
      price: product.price
    };
    this.editId = product._id ?? null;
    this.message = '';
  }

  deleteProduct(id: string): void {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.message = 'Product deleted successfully.';
        this.loadProducts();
      },
      error: () => {
        this.message = 'Delete failed.';
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
    this.message = '';
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      price: null
    };
    this.editId = null;
  }
}
