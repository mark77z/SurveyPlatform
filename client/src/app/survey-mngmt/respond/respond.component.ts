import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SurveyRepository } from '../../model/survey.repository';
import { Survey } from '../../model/survey.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import Swal from 'sweetalert2'

@Component({
    selector: 'respond',
    templateUrl: './respond.component.html',
    styleUrls: ['./respond.component.css']
})
export class RespondComponent implements OnInit {
    public surveyId: string;
    private sub: any;
    public survey: Survey;
    surveyForm: FormGroup;
    ckTrue: HTMLInputElement;
    ckFalse: HTMLInputElement;

    constructor(private router: Router,
        private repository: SurveyRepository,
        private route: ActivatedRoute,
        private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.surveyId = params['surveyId'];
            this.surveyForm = this.fb.group({
                surveyId: this.surveyId,
                gender: new FormControl(),
                age: ['', Validators.required],
                questions: this.fb.array([])
            });
            this.repository.getSurveyById(this.surveyId).subscribe(survey => {
                this.survey = survey;
                let questionsControl = <FormArray>this.surveyForm.controls.questions;
                survey.questions.forEach(question => {
                    questionsControl.push(this.fb.group({
                        _id: question._id,
                        text: question.text,
                        type: question.type,
                        answers: this.setAnswers(question.answers)
                    }))
                });
            });
        });
    }

    questions(): FormArray {
        return this.surveyForm.get("questions") as FormArray
    }

    answers(qIndex: number): FormArray {
        return this.questions().at(qIndex).get("answers") as FormArray
    }

    setAnswers(data) {
        let answersArr = new FormArray([])
        data.forEach(a => {
            answersArr.push(this.fb.group({
                text: a.text,
                ans: ['', Validators.required],
                _id: a._id
            }))
        })
        return answersArr;
    }

    onSubmit(): void {
        console.log(this.surveyForm.value);
        this.repository.answerSurvey(this.surveyForm.value, this.surveyId).subscribe(data => {
            if (data.success) {
                this.router.navigateByUrl('surveys/available');
                console.log(data);
                Swal.fire(
                    'Answers saved successfully',
                    'Correct Answers: ' + data.correctAnswers + '/' + data.totalQuestions,
                    'success'
                );
            }
            else {
                Swal.fire(
                    'Error saving answers',
                    'An error ocurred. Please try again later.',
                    'error'
                );
            }
        });
    }

    onCkTrueFalseChange(e, qIndex, aIndex) {
        this.ckTrue = document.getElementById('ck' + qIndex + '0') as HTMLInputElement;
        this.ckFalse = document.getElementById('ck' + qIndex + '1') as HTMLInputElement;
        
        var checkComponent = e.target.id as string;

        if(checkComponent.charAt(checkComponent.length - 1) === '0'){
            if(this.ckTrue.checked)
                this.ckFalse.checked = false;
                var cmp = ((((this.surveyForm.controls.questions as FormArray).controls[qIndex] as FormGroup).controls.answers as FormArray).controls[1] as FormGroup).controls;
                cmp.ans.setValue('');
        }
        else if(checkComponent.charAt(checkComponent.length - 1) === '1'){
            if(this.ckFalse.checked)
                this.ckTrue.checked = false;
                var cmp = ((((this.surveyForm.controls.questions as FormArray).controls[qIndex] as FormGroup).controls.answers as FormArray).controls[0] as FormGroup).controls;
                cmp.ans.setValue('');
        }
    }
}
