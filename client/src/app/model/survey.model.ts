import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Survey
{
  // tslint:disable-next-line: variable-name
  public _id: string;
  public title: string;
  public userId: string;
  public created_dte: Date;
  public updated_dte: Date;
  public expiration_dte: Date;
  public questions: Question[] = [];

  constructor() {}

}

export class Question
{
  constructor(
    public type: string,
    public text: string,
    public answers: Answer[] = []
  ){}
}

export class Answer
{
  constructor(
    public text: string,
    public isCorrect: boolean
  ){}
}
