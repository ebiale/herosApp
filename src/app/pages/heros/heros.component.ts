import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { HeroesService } from 'src/app/services/heroes.service';
import { HeroModel } from 'src/app/models/hero.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  heros: HeroModel[] = [];
  loading = true;
  constructor(private heroService: HeroesService) {}

  ngOnInit(): void {
    this.loadHeros();
  }

  deleteHero(hero: HeroModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${hero.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.value) {
        this.heroService.deleteHero(hero.id).subscribe((res: any) => {
          Swal.fire({
            icon: 'success',
            title: hero.name,
            text: 'Deleted',
            showConfirmButton: false,
            timer: 1500,
          });
          this.loadHeros();
        });
      }
    });
  }

  private loadHeros() {
    this.heros = [];
    this.loading = true;
    this.heroService.getHeroes().subscribe((res) => {
      this.heros = res;
      this.loading = false;
    });
  }
}
