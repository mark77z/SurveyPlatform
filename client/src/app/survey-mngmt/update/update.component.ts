import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyRepository } from '../../model/survey.repository';
import { Survey } from 'src/app/model/survey.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  surveyId: string;
  public surveyToEdit: Survey;
  private sub: any;
  surveyEditForm: FormGroup;

  constructor(private router: Router, private fb:FormBuilder, private route: ActivatedRoute, private repository: SurveyRepository)
  {
    this.sub = this.route.params.subscribe(params => {
      this.surveyId = params['surveyId'];
      this.surveyToEdit = this.repository.getSurvey(this.surveyId);
    });

    this.surveyEditForm = this.fb.group({
      title: this.surveyToEdit.title,
      expiration_dte: new FormControl(new Date(this.surveyToEdit.expiration_dte).toISOString().slice(0, -1)),
      questions: this.fb.array([])
    });

    let questionsControl = <FormArray>this.surveyEditForm.controls.questions;
    this.surveyToEdit.questions.forEach(question => {
      questionsControl.push(this.fb.group({
          text: question.text,
          type: question.type,
          answers: this.setAnswers(question.answers)
      }))
    });
  }

  questions() : FormArray
  {
    return this.surveyEditForm.get("questions") as FormArray
  }

  answers(qIndex: number) : FormArray
  {
    return this.questions().at(qIndex).get("answers") as FormArray
  }

  setAnswers(data){
    let answersArr = new FormArray([])
    data.forEach(a => {
      answersArr.push(this.fb.group({ 
        text: a.text,
        isCorrect: a.isCorrect 
      }))
    })
    return answersArr;
  }

  ngOnInit(): void {}
  
  surveyList(): void
  {
    this.router.navigateByUrl('/surveys/list');
  }

  onSubmit(): void
  {
    console.log(this.surveyEditForm.value);
    this.repository.updateSurvey(this.surveyId, this.surveyEditForm.value).subscribe(survey => {
      alert('Quiz edited successfully');
      this.router.navigate(['/surveys/list'])
      .then(() => {
        window.location.reload();
      });
    });
  }

}
