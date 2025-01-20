import { Component, Input, OnInit } from '@angular/core';
import gsap from 'gsap';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-floating-mascot',
  imports: [RouterLink],
  templateUrl: './floating-mascot.component.html',
  styleUrls: ['./floating-mascot.component.css']
})
export class FloatingMascotComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Animación de flotación del muñequito
    gsap.to('.mascot', {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });
  }

}
