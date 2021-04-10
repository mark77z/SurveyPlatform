import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable({
  providedIn: 'root'
})
export class SurveyRepository {
  private surveys: Survey[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  getSurveys(): Survey[] {
    return this.surveys;
  }

  getSurvey(id: string): Survey {
    return this.surveys.find(s => s._id === id);
  }

  getSurveyById(id: string): Observable<Survey> {
    return this.dataSource.getSurveyById(id);
  }

  getAvailableSurveys(): Survey[] {
    const currentDate = new Date();
    return this.surveys.filter(s => new Date(s.expiration_dte) >= currentDate);
  }

  getSurveysByUserName(username: string): Survey[] {
    return this.surveys.filter(s => s.userId === username);
  }

  createSurvey(survey: Survey): Observable<any> {
    return this.dataSource.createSurvey(survey);
  }

  answerSurvey(response: any, surveyId: string): Observable<any> {
    return this.dataSource.answerSurvey(response, surveyId);
  }

  updateSurvey(id: string, survey: Survey): Observable<any> {
    return this.dataSource.updateSurvey(id, survey);
  }

  removeSurvey(id: string): Observable<Survey> {
    return this.dataSource.deleteSurvey(id);
  }

  getUserCreatedSurveys(userId: string): Observable<any> {
    return this.dataSource.getUserCreatedSurveys(userId);
  }

  getUserCreatedSurveysAnswers(userId: string): Observable<any> {
    return this.dataSource.getUserCreatedSurveysAnswers(userId);
  }

  getSurveysCorrectAnswersForCreator(userId: string): Observable<any> {
    return this.dataSource.getSurveysCorrectAnswersForCreator(userId);
  }

  getSurveysTotalAnswersForCreator(userId: string): Observable<any> {
    return this.dataSource.getSurveysTotaltAnswersForCreator(userId);
  }

  getGeneralGenderStats(userId: string): Observable<any> {
    return this.dataSource.getGeneralGenderStats(userId);
  }

  getGeneralAgeStats(userId: string): Observable<any> {
    return this.dataSource.getGeneralAgeStats(userId);
  }

  getSurveysAnsweredPerSurvey(surveyId: string): Observable<any>{
    return this.dataSource.getSurveysAnsweredPerSurvey(surveyId);
  }

  getSurveysCorrectAnswersForSurvey(surveyId: string): Observable<any>{
    return this.dataSource.getSurveysCorrectAnswersForSurvey(surveyId);
  }

  getGenderStatsBySurvey(surveyId: string): Observable<any>{
    return this.dataSource.getGenderStatsBySurvey(surveyId);
  }

  getAgeStatsBySurvey(surveyId: string): Observable<any>{
    return this.dataSource.getAgeStatsBySurvey(surveyId);
  }
}
