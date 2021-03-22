import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const PROTOCOL = 'https';
const PORT = 3500;

@Injectable({
  providedIn: 'root'
})
export class RestDataSource
{
  baseUrl: string;
  authToken: string;

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
    console.log(JSON.stringify(survey));
    return this.http.post<Survey>(this.baseUrl + 'surveys/create', survey);
  }

  getSurveyById(id: string): Observable<Survey>
  {
    return this.http.get<Survey>(this.baseUrl + 'surveys/get/' + id);
  }

  updateSurvey(id: string, survey: Survey): Observable<Survey>
  {
    console.log(JSON.stringify(survey));
    return this.http.post<Survey>(this.baseUrl + 'surveys/update/' + id, survey);
  }

  deleteSurvey(id: string)
  {
    return this.http.get<Survey>(this.baseUrl + 'surveys/delete/' + id);
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}

