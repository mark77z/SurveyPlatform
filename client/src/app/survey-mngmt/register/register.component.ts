import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepository } from '../../model/user.repository';
import { User } from '../../model/user.model';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit
{
  public user: User;
  public errorMessage: string;

  constructor(private router: Router, private repository: UserRepository ) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  register(form: NgForm): void
  {
    if (form.valid)
    {
      this.repository.registerUser(form.value).subscribe(user => {
        if (user){
          this.router.navigateByUrl('surveys/list');
        }
      });
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
