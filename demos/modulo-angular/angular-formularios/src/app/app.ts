import { Component, signal } from '@angular/core';
import {StockInventoryComponent} from './stock-inventory/container/stock-inventory.component';


@Component({
  selector: 'app-root',
  imports: [
    StockInventoryComponent
  ],
  template: `
    <div>
      <stock-inventory></stock-inventory>
    </div>

  `
})
export class App {

}
