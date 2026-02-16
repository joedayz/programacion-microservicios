import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Product } from "../../models/product.interface";
import { CurrencyPipe } from "@angular/common";







@Component({
    selector: 'stock-products',
    styleUrls: ['stock-products.component.css'],
    imports: [
        ReactiveFormsModule,
        CurrencyPipe
    ],
    template:`
    
        <div class="stock-product" [formGroup] ="parent">
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
    
    `
})
export class StockProductsComponent{


    @Input()
    parent!: FormGroup;

    @Input()
    map!: Map<number, Product>;

    @Output()
    removed = new EventEmitter<any>();


    get stocks(){
        return (this.parent.get('stock') as FormArray).controls;
    }

    getProduct(product_id:number){
        return this.map.get(product_id);
    }

    onRemove(group: AbstractControl,i: number) {
       this.removed.emit( {group, i});
    }

}