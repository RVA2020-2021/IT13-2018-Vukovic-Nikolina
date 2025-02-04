import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { KlijentComponent } from './components/klijent/klijent.component';
import { KreditComponent } from './components/kredit/kredit.component';
import { TipRacunaComponent } from './components/tip-racuna/tip-racuna.component';


const routes: Routes = [

  { path: 'kredit', component: KreditComponent},
  { path: 'klijent', component: KlijentComponent},
  { path: 'tipRacuna', component: TipRacunaComponent}, //nisam sig
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'author', component: AuthorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'} //ako unese nes drugo pa ga redirectuje

];    //niz ruta sadrzi objekte tipa routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
