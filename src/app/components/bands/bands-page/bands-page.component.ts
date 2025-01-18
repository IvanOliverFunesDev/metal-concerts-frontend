import { Component } from '@angular/core';
import { ConcertsListComponent } from "../../concerts/concerts-list/concerts-list.component";
import { ConcertsService } from '../../../services/concerts.service';
import { BandsListComponent } from "../bands-list/bands-list.component";

@Component({
  selector: 'app-bands-page',
  imports: [ConcertsListComponent, BandsListComponent],
  templateUrl: './bands-page.component.html',
  styleUrl: './bands-page.component.css'
})
export class BandsPageComponent {

  constructor(public consertsService: ConcertsService) { }

}
