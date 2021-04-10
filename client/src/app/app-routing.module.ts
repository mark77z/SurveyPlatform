import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AvailableComponent } from './survey-mngmt/available/available.component';
import { CreateComponent } from './survey-mngmt/create/create.component';
import { ListComponent } from './survey-mngmt/list/list.component';
import { StatsComponent } from './survey-mngmt/stats/stats.component';
import { UpdateComponent } from './survey-mngmt/update/update.component';
import { RegisterComponent } from './survey-mngmt/register/register.component';
import { RespondComponent } from './survey-mngmt/respond/respond.component';
import { AccountComponent } from './survey-mngmt/account/account.component';
import { AuthComponent } from './survey-mngmt/auth/auth.component';
import { StoreFirstGuard } from './guards/storeFirstGuard.guard';
import { AuthGuard } from './survey-mngmt/auth/auth.guard';

const routes: Routes = [
 {path: 'home', component: HomeComponent, data: {title: 'Survey Builder'}},
 {path: 'about', component: AboutComponent, data: {title: 'About'}},
 { path: 'surveys/available', component: AvailableComponent },
 { path: 'surveys/list', component: ListComponent,canActivate: [AuthGuard] },
 { path: 'surveys/create', component: CreateComponent,canActivate: [AuthGuard] },
 { path: 'surveys/update/:surveyId', component: UpdateComponent,canActivate: [AuthGuard] },
 { path: 'surveys/respond/:surveyId', component: RespondComponent},
 { path: 'surveys/stats', component: StatsComponent ,canActivate: [AuthGuard]},
 { path: 'surveys/stats/:surveyId', component: StatsComponent ,canActivate: [AuthGuard]},
 { path: 'login', component: AuthComponent },
 { path: 'account/:userId', component: AccountComponent, canActivate: [AuthGuard]},
 { path: 'register', component: RegisterComponent },
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [StoreFirstGuard ]
})
export class AppRoutingModule { }
