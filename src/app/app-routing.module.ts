import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [{ path: 'homepage' , component: MainmenuComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
