import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';

@Component({
  selector: 'app-survey-mngmt',
  templateUrl: './list/list.component.html'
})
export class SurveyMngmtComponent {

  constructor(private auth: AuthService,
    private router: Router) {}

  logout(): void
  {
  this.auth.logout();

  this.router.navigateByUrl('/');
  }
}
