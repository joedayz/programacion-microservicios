import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StockCounterComponent} from '../stock-counter/stock-counter.component';
import {Product} from '../../models/product.interface';


@Component({
    selector: 'stock-selector',
    template: `

      <div class="stock-selector" [formGroup]="parent">
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
          <stock-counter [step]=10 [min]="10" [max]="1000" formControlName="quantity"></stock-counter>

          <!-- counter end -->
          <button type="button" (click)="onAdd()" [disabled]="!hasProductSelected() || parent.hasError('stockExists')">
            Add Stock
          </button>
        </div>
      </div>

    `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    StockCounterComponent
  ],
    styleUrls: ['./stock-selector.component.css']
  }
)
export class StockSelectorComponent {

  @Input()
  parent!: FormGroup;

  @Input()
  products: Product[] = [];

  @Output()
  added = new EventEmitter<any>();


  protected hasProductSelected():boolean{
    const control = this.parent.get('selector')?.get('product_id')?.value;
    return control != '' && control !=null;
  }

  protected onAdd() {
    this.added.emit(this.parent.get('selector')?.value);
    this.parent.get('selector')?.reset({
      product_id: '',
      quantity: 10
    });
  }
}
