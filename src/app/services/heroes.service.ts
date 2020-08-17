import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { HeroModel } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url_base = 'https://heroapp-74eba.firebaseio.com'
  constructor(private http: HttpClient) { }

  addHero(hero: HeroModel) {
    return this.http.post(`${this.url_base}/heros.json`, hero).pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero
      })
    );
  }

  update(hero: HeroModel) {

    const heroToUpdate = {...hero};
    delete heroToUpdate.id;
    return this.http.put(`${this.url_base}/heros/${hero.id}.json`, heroToUpdate).pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero
      })
    );
  }

  getHeroes() {
    return this.http.get(`${this.url_base}/heros.json`).pipe(
      map(this.createHerosArray)
    )
  }

  getHeroById(id: string) {
    return this.http.get(`${this.url_base}/heros/${id}.json`)
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.url_base}/heros/${id}.json`)
  }

  private createHerosArray(heroObj: Object) {
    const heros: HeroModel[] = [];

    if (heroObj === null) return [];
    Object.keys(heroObj).forEach(key => {
      const hero: HeroModel = heroObj[key];
      hero.id = key;

      heros.push(hero);
    });
    
    return heros;
  }
  
}
