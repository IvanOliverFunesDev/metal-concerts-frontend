import { Component } from '@angular/core';
import { NavbarComponent } from "../layout/navbar/navbar.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { FloatingMascotComponent } from '../shared/floating-mascot/floating-mascot.component';

@Component({
  selector: 'app-main',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, FloatingMascotComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
