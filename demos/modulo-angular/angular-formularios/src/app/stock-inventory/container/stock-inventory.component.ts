import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Item, Product} from '../models/product.interface';
import {FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {StockInventoryService} from '../services/stock-inventory.service';
import {forkJoin} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
    selector: 'stock-inventory',
    standalone: true,
    template: `
      <div class="stock-inventory">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

        </form>

      </div>
    `,
    imports: [
      ReactiveFormsModule
    ]
  }
)
export class StockInventoryComponent implements OnInit {
  products: Product[] = [];

  total: number = 0;

  productMap: Map<number, Product> = new Map();


  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private stockService = inject(StockInventoryService);

  ngOnInit(): void {
    this.loadInitialData();
  }

  // -------
  // FORM
  // -------
  form = this.fb.group({
    store: this.fb.group({
      branch: [''],
      code: ['']
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  private loadInitialData(): void {
    forkJoin({
      cart: this.stockService.getCartItems(),
      products: this.stockService.getProducts()
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({cart, products}) => {
        this.initProducts(products);
        this.initCart(cart);
      });
  }

  private initProducts(products: Product[]) {
    this.products = products;
    this.productMap = new Map(products.map(product => [product.id, product]));
  }

  private initCart(cart: Item[]) {
    cart.forEach(item => this.addStock(item))
  }

  private addStock(item: Item) {
    (this.form.get('stock') as FormArray).push(this.createStock(item));
  }

  protected onSubmit() {

  }

  private createStock(stock: any) {
    return this.fb.group({
      product_id: Number(stock.product_id) || '',
      quantity: Number(stock.quantity) || 10
    });
  }
}
