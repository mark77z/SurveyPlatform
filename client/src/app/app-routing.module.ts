import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AvailableComponent } from './survey-mngmt/available/available.component'
import { CreateComponent } from './survey-mngmt/create/create.component'
import { ListComponent } from './survey-mngmt/list/list.component'
import { UpdateComponent } from './survey-mngmt/update/update.component'

const routes: Routes = [
 {path: 'home', component: HomeComponent, data: {title: 'Home'}},
 {path: 'about', component: AboutComponent, data: {title: 'About'}},
 { path: 'surveys/available', component: AvailableComponent },
 { path: 'surveys/list', component: ListComponent },
 { path: 'surveys/create', component: CreateComponent },
 { path: 'surveys/update/:surveyId', component: UpdateComponent },
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [ ]
})
export class AppRoutingModule { }
