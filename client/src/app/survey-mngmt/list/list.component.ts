import { Component, OnInit } from '@angular/core';
import { SurveyRepository } from '../../model/survey.repository';
import { AuthService } from 'src/app/model/auth.service';
import { Survey } from '../../model/survey.model';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  constructor(private router: Router, private repository: SurveyRepository, private authService: AuthService) { }

  user: User;

  get surveys(): Survey[] {
    const result = this.authService.authenticated;
    if (result) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    return this.repository.getSurveysByUserName(this.user.username);
  }

  updateQuiz(surveyId: string): void {
    this.router.navigate(['/surveys/update/', surveyId]);
  }

  removeQuiz(surveyId: string): void {

    Swal.fire({
      title: 'Are you sure to delete the survey?',
      text: "The survey will be deleted permanently",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete survey'
    }).then((result) => {
      if (result.isConfirmed) {
        this.repository.removeSurvey(surveyId)
          .subscribe(
            response => {
              window.location.reload();
            },
            error => {
              console.log(error);
            });
      }
    });
  }
}