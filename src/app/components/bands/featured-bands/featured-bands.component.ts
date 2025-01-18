import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-bands',
  imports: [NgFor],
  templateUrl: './featured-bands.component.html',
  styleUrl: './featured-bands.component.css'
})
export class FeaturedBandsComponent {

  bandasDestacadas = [
    { title: "Meteora", image: "https://tse4.mm.bing.net/th?id=OIP.CkVSativ_3X5C9zcWbSY8QHaF7&w=379&h=379&c=7" },
    { title: "Hybrid Theory", image: "https://tse2.mm.bing.net/th?id=OIP.Tz5RnqiG3P7gX_CweLsTlAHaHa&w=474&h=474&c=7" },
    { title: "System of a Down", image: "https://www.thexboxhub.com/wp-content/uploads/2014/01/system-of-a-down-header.jpg" },
    { title: "Metallica - Master of Puppets", image: "https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg" },
    { title: "Iron Maiden - The Number of the Beast", image: "https://tse3.mm.bing.net/th?id=OIP.g5wcsd5dYlIxDCzS2JESGAHaHa&w=474&h=474&c=7" },
    { title: "Slipknot - Iowa", image: "https://tse1.mm.bing.net/th?id=OIP.pyhJDIrey_oyAjtRU8Z0DgHaHa&w=474&h=474&c=7" },
    { title: "Pantera - Vulgar Display of Power", image: "https://tse2.mm.bing.net/th?id=OIP.29PNXE0gJtV5ScLjGZSW5wHaE8&w=316&h=316&c=7" },
    { title: "Avenged Sevenfold - City of Evil", image: "https://tse2.mm.bing.net/th?id=OIP.vZ1Z98CdF7tmh2Qc04ET-AHaHb&w=474&h=474&c=7" },
    { title: "Megadeth - Rust in Peace", image: "https://tse1.mm.bing.net/th?id=OIP.HUiQSaxvpQMOWDMKhbL7rwHaHX&w=471&h=471&c=7" },
    { title: "Judas Priest - Painkiller", image: "https://tse1.mm.bing.net/th?id=OIP.1jljSJEkp6xYJDWO3edFRwHaHa&w=474&h=474&c=7" },
    { title: "Lamb of God - Ashes of the Wake", image: "https://tse1.mm.bing.net/th?id=OIP.L_upcw6_xbyJQJCYu2bTCgHaHa&w=474&h=474&c=7" },
    { title: "Korn - Follow the Leader", image: "https://tse3.mm.bing.net/th?id=OIP.lMvSA5Pke0JfA9_VhGkYCgHaHa&w=474&h=474&c=7" },
    { title: "Rammstein - Mutter", image: "https://tse1.mm.bing.net/th?id=OIP.N0spQ8U9TSLSPeaFE5AJ7QHaEK&w=266&h=266&c=7" }
  ];


  bandasAleatorias: { title: string, image: string }[] = [];

  constructor() {
    this.shuffleAndSelectConcerts();
  }

  shuffleAndSelectConcerts() {
    const shuffledConcerts = [...this.bandasDestacadas];
    for (let i = shuffledConcerts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledConcerts[i], shuffledConcerts[j]] = [shuffledConcerts[j], shuffledConcerts[i]];
    }

    this.bandasAleatorias = shuffledConcerts.slice(0, 4);
  }
}
