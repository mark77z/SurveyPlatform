import { Component } from '@angular/core';
import { SurveyRepository } from '../../model/survey.repository';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  submitted = false;
  createdSurvey = false;
  surveyForm: FormGroup;

  constructor(private fb:FormBuilder, private router: Router, private repository: SurveyRepository)
  { 
    this.surveyForm = this.fb.group({
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

  availableSurveys(): void
  {
    this.router.navigateByUrl('/surveys/available');
  }

  onSubmit(): void
  {
    console.log(this.surveyForm.value);
    this.repository.createSurvey(this.surveyForm.value).subscribe(survey => {
      alert('Quiz created successfully');
      this.router.navigate(['/surveys/available'])
      .then(() => {
        window.location.reload();
      });
    });
  }
}
