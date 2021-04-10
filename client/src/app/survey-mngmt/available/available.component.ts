import { Component, OnInit } from '@angular/core';
import { SurveyRepository } from '../../model/survey.repository';
import { Survey } from '../../model/survey.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent {

  constructor(private router: Router, private repository: SurveyRepository) { }

  get surveys(): Survey[] {
    return this.repository.getSurveys();
  }

  get availableSurveys(): Survey[] {
    return this.repository.getAvailableSurveys();
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
