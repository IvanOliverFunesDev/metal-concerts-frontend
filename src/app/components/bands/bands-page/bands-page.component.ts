import { Component } from '@angular/core';
import { BandsListComponent } from "../bands-list/bands-list.component";
import { BandsService } from '../../../services/bands.service';

@Component({
  selector: 'app-bands-page',
  imports: [BandsListComponent],
  templateUrl: './bands-page.component.html',
  styleUrl: './bands-page.component.css'
})
export class BandsPageComponent {

  constructor(public bandsService: BandsService) { }

}
