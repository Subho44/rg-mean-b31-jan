import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card card-shadow border-0 mb-4">
      <div class="card-body p-4">
        <h3 class="text-center mb-4">{{ editId ? 'Update Product' : 'Add Product' }}</h3>

        <form (ngSubmit)="onSubmit()">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Product Name</label>
              <input
                type="text"
                class="form-control"
                [(ngModel)]="formData.name"
                name="name"
                placeholder="Enter product name"
                required
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">Product Price</label>
              <input
                type="number"
                class="form-control"
                [(ngModel)]="formData.price"
                name="price"
                placeholder="Enter product price"
                required
              />
            </div>
          </div>

          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn" [ngClass]="editId ? 'btn-warning' : 'btn-success'">
              {{ editId ? 'Update Product' : 'Add Product' }}
            </button>

            <button *ngIf="editId" type="button" class="btn btn-secondary" (click)="cancel.emit()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProductFormComponent {
  @Input({ required: true }) formData!: Product;
  @Input() editId: string | null = null;
  @Output() submitProduct = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    this.submitProduct.emit();
  }
}
