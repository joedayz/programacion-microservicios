import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";





@Component({
    selector: 'stock-branch',
    styleUrls: ['stock-branch.component.css'],
    imports:[ ReactiveFormsModule],
    template: `
    <div [formGroup]="parent">
     <div formGroupName="store">
            <input type="text" formControlName="branch" placeholder="Branch ID">
            <input type="text" formControlName="code" placeholder="Manager Code">

     </div>
    </div>
    
    `
})
export class StockBranchComponent {
    @Input()
    parent!: FormGroup;
}