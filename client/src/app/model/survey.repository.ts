import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable({
  providedIn: 'root'
})
export class SurveyRepository
{
  private surveys: Survey[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  getSurveys(): Survey[]
  {
    return this.surveys;
  }

  getSurvey(id: string): Survey
  {
    return this.surveys.find(s => s._id === id);
  }

  getAvailableSurveys(): Survey[]
  {
    const currentDate  = new Date();
    return this.surveys.filter(s => new Date(s.expiration_dte) >= currentDate);
  }

  getSurveysByUserName(username: string): Survey[]
  {
    return this.surveys.filter(s => s.userId === username);
  }

  createSurvey(survey: Survey): Observable<Survey>
  {
    return this.dataSource.createSurvey(survey);
  }

  updateSurvey(id: string, survey: Survey): Observable<Survey>
  {
    return this.dataSource.updateSurvey(id, survey);
  }

  removeSurvey(id: string): Observable<Survey>
  {
    return this.dataSource.deleteSurvey(id);
  }
}
