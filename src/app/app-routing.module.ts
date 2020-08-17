import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { HerosComponent } from './pages/heros/heros.component';

const routes: Routes = [
  {path: 'hero/:id', component:HeroComponent},
  {path: 'heros', component:HerosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heros'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
