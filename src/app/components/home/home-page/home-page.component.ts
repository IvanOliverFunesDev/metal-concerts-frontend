import { Component } from '@angular/core';
import { SliderComponent } from "../../bands/slider/slider.component";
import { ConcertsListComponent } from "../../concerts/concerts-list/concerts-list.component";
import { ConcertsService } from '../../../services/concerts.service';
import { BandsListComponent } from "../../bands/bands-list/bands-list.component";
import { BandsService } from '../../../services/bands.service';

@Component({
  selector: 'app-home-page',
  imports: [SliderComponent, ConcertsListComponent, BandsListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(public concertsService: ConcertsService, public bandsService: BandsService) { };
}
