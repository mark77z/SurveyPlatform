import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable({
  providedIn: 'root'
})
export class UserRepository
{
  private users: User[] = [];

  constructor(private dataSource: RestDataSource)
  {
    //TODO
  }

  registerUser(user: User): Observable<any>
  {
    return this.dataSource.registerUser(user);
  }
}
