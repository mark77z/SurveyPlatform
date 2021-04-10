import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from '../model/model.module';
import { ListComponent } from './list/list.component';
import { StatsComponent } from './stats/stats.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { RegisterComponent } from './register/register.component';
import { AvailableComponent } from './available/available.component';
import { AccountComponent } from './account/account.component';
import { RespondComponent } from './respond/respond.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [ListComponent, CreateComponent, UpdateComponent, AvailableComponent, AuthComponent, RegisterComponent, RespondComponent, StatsComponent, AccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ModelModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthGuard],
})
export class SurveyMngmtModule { }
