import { Component } from '@angular/core';
import { ConcertsListComponent } from "../concerts-list/concerts-list.component";
import { ConcertsService } from '../../../services/concerts.service';

@Component({
  selector: 'app-concerts-page',
  imports: [ConcertsListComponent],
  templateUrl: './concerts-page.component.html',
  styleUrl: './concerts-page.component.css'
})
export class ConcertsPageComponent {

  constructor(public concertsService: ConcertsService) { }


}
