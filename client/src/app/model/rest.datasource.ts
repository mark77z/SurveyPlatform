import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { User } from './user.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable({
  providedIn: 'root'
})
export class RestDataSource
{
  private user: User;
  private baseUrl: string;
  private authToken: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService)
  {
    //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    this.baseUrl = `https://final-survey-platform-comp229.herokuapp.com/api/`
  }

  getSurveys(): Observable<Survey[]>
  {
    return this.http.get<Survey[]>(this.baseUrl + 'surveys/list');
  }

  createSurvey(survey: Survey): Observable<any>
  {
    this.loadToken();
    return this.http.post<Survey>(this.baseUrl + 'surveys/create', survey, this.httpOptions);
  }

  getSurveyById(id: string): Observable<Survey>
  {
    return this.http.get<Survey>(this.baseUrl + 'surveys/get/' + id);
  }

  updateSurvey(id: string, survey: Survey): Observable<any>
  {
    this.loadToken();
    return this.http.post<Survey>(this.baseUrl + 'surveys/update/' + id, survey, this.httpOptions);
  }

  deleteSurvey(id: string)
  {
    this.loadToken();
    return this.http.get<Survey>(this.baseUrl + 'surveys/delete/' + id, this.httpOptions);
  }

  answerSurvey(response: any, surveyId: string): Observable<any>
  {
    return this.http.post<Survey>(this.baseUrl + 'surveys/response/' + surveyId, response, this.httpOptions);
  }

  getUserCreatedSurveys(userId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/count/forUser/' + userId, this.httpOptions);
  }

  getUserCreatedSurveysAnswers(userId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/creator/' + userId, this.httpOptions);
  }

  getSurveysAnsweredPerSurvey(surveyId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/survey/' + surveyId, this.httpOptions);
  }

  getSurveysCorrectAnswersForCreator(userId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/correct/creator/' + userId, this.httpOptions);
  }

  getSurveysCorrectAnswersForSurvey(surveyId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/correct/survey/' + surveyId, this.httpOptions);
  }

  getSurveysTotaltAnswersForCreator(userId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/total/creator/' + userId, this.httpOptions);
  }

  getGeneralGenderStats(userId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/gender/creator/' + userId, this.httpOptions);
  }

  getGenderStatsBySurvey(surveyId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/gender/survey/' + surveyId, this.httpOptions);
  }
  
  getAgeStatsBySurvey(surveyId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/age/survey/' + surveyId, this.httpOptions);
  }

  getGeneralAgeStats(userId: string): Observable<any>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'surveys/get/answered/age/creator/' + userId, this.httpOptions);
  }

  getUserByUsername(username: string): Observable<User>
  {
    this.loadToken();
    return this.http.get<any>(this.baseUrl + 'users/get/' + username, this.httpOptions);
  }

  updateUser(username: string, user: User): Observable<any>
  {
    this.loadToken();
    return this.http.post<User>(this.baseUrl + 'users/update/' + username, user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  registerUser(user: User): Observable<any>
  {
    return this.http.post<User>(this.baseUrl + 'register', user, this.httpOptions);
  }

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }
  
  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    if(token){
      this.authToken = token;
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    }
  }
}

