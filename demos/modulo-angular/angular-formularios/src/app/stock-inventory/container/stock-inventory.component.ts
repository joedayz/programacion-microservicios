import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Item, Product} from '../models/product.interface';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StockInventoryService} from '../services/stock-inventory.service';
import {forkJoin, map} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CurrencyPipe, JsonPipe} from '@angular/common';
import {StockSelectorComponent} from '../components/stock-selector/stock-selector.component';
import { StockBranchComponent } from "../components/stock-branch/stock-branch.component";
import { StockValidators } from './stock-inventory.validators';
import { StockProductsComponent } from "../components/stock-products/stock-products.component";


@Component({
    selector: 'stock-inventory',
    standalone: true,
    template: `
      <div class="stock-inventory">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
         

          <!-- branch begin -->
          <stock-branch [parent]="form"></stock-branch>
          <!-- branch end -->


          <!-- selector begin -->

          <stock-selector [parent]="form" [products]="products" (added)="addStock($event)"></stock-selector>

          <!-- selector end -->

          <!-- Product begin -->
          <stock-products [parent]="form" [map]="productMap" 
          (removed)="removeStock($event)"></stock-products>

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
    CurrencyPipe,
    StockSelectorComponent,
    StockBranchComponent,
    StockProductsComponent
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
      branch: ['', [
        Validators.required,
        StockValidators.checkBranch
      ],
      this.validateBranch.bind(this)],
      code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  },{
    validators: [StockValidators.checkStockExists]
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

  protected addStock(item: Item) {
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

  validateBranch(control:AbstractControl)  {
     let valor = this.stockService.checkBranchId(control.value)
      .pipe(
        map( (res:boolean) => res ? null: { unknownBranch:true })
      );
      return valor;
  }

  // branch methods end


  // products methods begin
  removeStock( {group, index} : {group:FormGroup, index:number}){
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  // products methods end



}
