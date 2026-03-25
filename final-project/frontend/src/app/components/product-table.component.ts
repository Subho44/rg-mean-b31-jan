import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="card card-shadow border-0">
      <div class="card-body p-4">
        <h3 class="text-center mb-4">All Products</h3>

        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle text-center">
            <thead class="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="products.length === 0">
                <td colspan="4">No products found.</td>
              </tr>
              <tr *ngFor="let product of products; let i = index">
                <td>{{ i + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price | currency:'INR':'symbol':'1.0-0' }}</td>
                <td>
                  <button class="btn btn-sm btn-primary me-2" (click)="edit.emit(product)">Edit</button>
                  <button class="btn btn-sm btn-danger" (click)="remove.emit(product._id!)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<string>();
}
