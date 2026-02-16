import {Component, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'stock-counter',
  template: `

    <div class="stock-counter" [class.focused]="focus">
      <div tabindex="0" (keydown)="onKeyDown($event)"
           (blur)="onBlur($event)" (focus)="onFocus($event)">
        <p>{{ value }}
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

  `,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./stock-counter.component.css']
})
export class StockCounterComponent implements ControlValueAccessor{

  private onTouch!: Function;
  private onModelChange!: Function;

  focus: boolean = false;
  value: number = 10;

  @Input()
  step: number = 10;

  @Input()
  min: number = 10;

  @Input()
  max: number = 1000;



  protected increment() {
    if(this.value<this.max){
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  protected decrement() {
    if(this.value>this.min){
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  registerOnChange(fn: any) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }


  protected readonly onkeydown = onkeydown;

  onKeyDown(event: KeyboardEvent) {
    const handlers: Record<string, () => void> = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment()
    };
    const handler = handlers[event.code];
    if (handler) {
      handler();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();
  }


  protected onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }


}
