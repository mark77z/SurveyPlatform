import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable({
  providedIn: 'root'
})
export class UserRepository
{
  private user: User = new User();
  private loaded = false;

  constructor(private dataSource: RestDataSource){}

  registerUser(user: User): Observable<any>
  {
    return this.dataSource.registerUser(user);
  }

  loadUserByUsername(username: string): void
  {
    this.loaded = true;
    this.dataSource.getUserByUsername(username).subscribe(user=> this.user = user);
  }


  getUserByUsername(username: string): User
  {
    if(!this.loaded)
    {
      this.loadUserByUsername(username);
    }

    return this.user;
  }


  updateUser(username: string, user: User): Observable<any>
  {
    return this.dataSource.updateUser(username, user);
  }
}
