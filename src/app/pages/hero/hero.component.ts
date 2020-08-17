import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { HeroModel } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  saving = false;
  hero = new HeroModel();

  constructor(private heroService: HeroesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.heroService.getHeroById(id).subscribe((res: HeroModel) => {
        this.hero = res;
        this.hero.id = id;
      })
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.saving = true;

    Swal.fire({
      title: 'Wait',
      text: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let request: Observable<any>;

    if (this.hero.id) {
      request = this.heroService.update(this.hero);
    } else {
      request = this.heroService.addHero(this.hero);
    }
    
    request.subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: this.hero.name,
        text: 'Changes submited'
      });
      this.saving = false;
    });

  }
}
