import { Component } from '@angular/core';
import { SurveyRepository } from '../../model/survey.repository';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  submitted = false;
  createdSurvey = false;
  surveyForm: FormGroup;
  user: User;

  constructor(private fb:FormBuilder, private router: Router, private repository: SurveyRepository, private authService: AuthService)
  { 
    const result = this.authService.authenticated;
    if (result)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.surveyForm = this.fb.group({
      userId: this.user.username,
      title: '',
      expiration_dte: new Date(),
      questions: this.fb.array([])
    });
  }

  questions() : FormArray
  {
    return this.surveyForm.get("questions") as FormArray
  }

  answers(qIndex: number) : FormArray
  {
    return this.questions().at(qIndex).get("answers") as FormArray
  }

  newAnswerToQuestion(): FormGroup
  {
    return this.fb.group({
      text: '',
      isCorrect: false,
    })
  }

  addAnswerToQuestion(qIndex:number)
  {
    this.answers(qIndex).push(this.newAnswerToQuestion());
  }

  newQuestion(): FormGroup
  {
    return this.fb.group({
      type: '',
      text: '',
      answers: this.fb.array([])
    })
  }

  addQuestion()
  {
    this.questions().push(this.newQuestion());
  }

  surveyList(): void
  {
    this.router.navigateByUrl('/surveys/list');
  }

  onSubmit(): void
  {
    console.log(this.surveyForm.value);
    this.repository.createSurvey(this.surveyForm.value).subscribe(survey => {
      alert('Quiz created successfully');
      this.router.navigate(['/surveys/list'])
      .then(() => {
        window.location.reload();
      });
    });
  }
}
