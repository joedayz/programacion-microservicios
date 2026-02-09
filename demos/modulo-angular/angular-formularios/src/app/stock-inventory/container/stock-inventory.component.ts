import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Item, Product} from '../models/product.interface';
import {AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {StockInventoryService} from '../services/stock-inventory.service';
import {forkJoin} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CurrencyPipe, JsonPipe} from '@angular/common';


@Component({
    selector: 'stock-inventory',
    standalone: true,
    styleUrls: ['./stock-inventory.component.css'],
    template: `
      <div class="stock-inventory">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div formGroupName="store">

            <!-- branch begin -->
            <input type="text" formControlName="branch" placeholder="Branch ID">
            <input type="text" formControlName="code" placeholder="Manager Code">
            <!-- branch end -->

          </div>

          <!-- selector begin -->

          <div class="stock-selector">
            <div formGroupName="selector">
              <select formControlName="product_id">
                <option value="">Select stock</option>

                @for (product of products; track product.id) {
                  <option [value]="product.id">
                    {{ product.name }}
                  </option>
                }
              </select>
              <!-- selector end -->
              <!-- counter begin -->
              <div class="stock-counter" [class.focused]="focus" >
                <div>
                  <input
                    type="number"
                    step="10"
                    min="10"
                    max="1000"
                    formControlName="quantity">
                  <div>
                    <button type="button" (click)="increment()" [disabled]="value==max">
                      +
                    </button>
                    <button type="button" (click)="decrement()" [disabled]="value==min">
                      -
                    </button>
                  </div>
                </div>
              </div>

              <!-- counter end -->
              <button type="button" (click)="onAdd()">
                Add Stock
              </button>
            </div>
          </div>

          <!-- selector end -->

          <!-- Product begin -->
          <div class="stock-product">
            <div formArrayName="stock">

              @for (item of stocks; let i = $index; track i) {
                <div>
                  <div class="stock-product__content" [formGroupName]="i">
                    <div class="stock-product__name">
                      {{ getProduct(item.value.product_id)!.name }}
                    </div>
                    <div class="stock-product__price">
                      {{ getProduct(item.value.product_id)!.price  | currency:'USD':true }}
                    </div>

                    <input
                      type="number"
                      step="10"
                      min="10"
                      max="1000"
                      formControlName="quantity">

                    <button
                      type="button"
                      (click)="onRemove(item, i)">
                      Remove
                    </button>
                  </div>
                </div>
              }

            </div>
          </div>

          <!-- Products end -->

          <div class="stock-inventory__price">
            Total: {{ total | currency:'USD':true }}
          </div>

          <div class="stock-inventory__buttons">
            <button
              type="submit"
              [disabled]="form.invalid">
              Order stock
            </button>
          </div>

<!--          <pre>{{ form.value | json }}</pre>-->

        </form>

      </div>
    `,
    imports: [
      ReactiveFormsModule,
      CurrencyPipe
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

  // counter variables begin

  focus: boolean = false;
  value: number = 10;
  min: number = 10;
  max: number = 1000;


  // counter variables end


  ngOnInit(): void {
    this.loadInitialData();
  }

  // -------
  // FORM
  // -------
  form = this.fb.group({
    store: this.fb.group({
      branch: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{1}\d{3}$/)
      ]],
      code: ['', Validators.required]
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

  // branch methods begin

  // branch methods end

  // selector methods begin

  // selector methods end

  // counter methods begin

  protected increment() {

  }

  protected decrement() {

  }
  protected onAdd() {

  }
  // counter methods end


  // products methods begin

  get stocks(){
    return (this.form.get('stock') as FormArray).controls;
  }
  protected getProduct(product_id: any) {
    return this.productMap.get(product_id);
  }
  protected onRemove(item: AbstractControl<any>, i: number) {

  }
  // products methods end



}
