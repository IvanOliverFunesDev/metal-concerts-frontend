import { Component } from '@angular/core';
import { ConcertsService } from '../../../services/concerts.service';
import { BandsListComponent } from "../bands-list/bands-list.component";

@Component({
  selector: 'app-bands-page',
  imports: [BandsListComponent],
  templateUrl: './bands-page.component.html',
  styleUrl: './bands-page.component.css'
})
export class BandsPageComponent {

  constructor(public consertsService: ConcertsService) { }

}
