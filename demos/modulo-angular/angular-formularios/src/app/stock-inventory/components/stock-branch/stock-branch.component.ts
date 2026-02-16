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


            @if(required('branch')){
                <div class="error">
                    Branch ID is required
                </div>
            }

            <input type="text" formControlName="code" placeholder="Manager Code">

     </div>
    </div>
    
    `
})
export class StockBranchComponent {

    @Input()
    parent!: FormGroup;


    required(name: string):boolean {
        const control = this.parent.get(`store.${name}`);
        return !!control && control.hasError('required') && control.touched;
    }
}