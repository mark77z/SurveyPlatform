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
    this.baseUrl = `https://survey-platform-comp229.herokuapp.com/api/`
  }

  getSurveys(): Observable<Survey[]>
  {
    return this.http.get<Survey[]>(this.baseUrl + 'surveys/list');
  }

  createSurvey(survey: Survey): Observable<Survey>
  {
    this.loadToken();
    return this.http.post<Survey>(this.baseUrl + 'surveys/create', survey, this.httpOptions);
  }

  getSurveyById(id: string): Observable<Survey>
  {
    return this.http.get<Survey>(this.baseUrl + 'surveys/get/' + id);
  }

  updateSurvey(id: string, survey: Survey): Observable<Survey>
  {
    this.loadToken();
    return this.http.post<Survey>(this.baseUrl + 'surveys/update/' + id, survey, this.httpOptions);
  }

  deleteSurvey(id: string)
  {
    this.loadToken();
    return this.http.get<Survey>(this.baseUrl + 'surveys/delete/' + id, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer ' + token);
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

