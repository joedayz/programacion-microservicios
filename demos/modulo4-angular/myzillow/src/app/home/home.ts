import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {HousingLocationInfo} from '../housinglocation';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingService} from '../housing';


@Component({
  selector: 'app-home',
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of  filteredLocationList; track $index) {
        <app-housing-location [housingLocation] = "housingLocation"/>
      }

    </section>
  `,
  styleUrl: './home.css',
  imports: [
    HousingLocation
  ]
})
export class Home {

  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);

  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this.housingService
      .getAllHousingLocations()
      .then( (housingLocationList : HousingLocationInfo[])=>{
         this.housingLocationList = housingLocationList;
        this.filteredLocationList = this.housingLocationList;
        this.changeDetectorRef.markForCheck();
      });



  }

  protected filterResults(text: string) {
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList
      .filter(location =>
        location?.city.toLowerCase().includes(text.toLowerCase()));
  }
}
