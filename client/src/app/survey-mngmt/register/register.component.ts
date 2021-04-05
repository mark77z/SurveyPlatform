import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepository } from '../../model/user.repository';
import { User } from '../../model/user.model';
import { AuthService } from '../../model/auth.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit
{
  public user: User;
  public errorMessage: string;

  constructor(private router: Router, private repository: UserRepository, private auth: AuthService ) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  register(form: NgForm): void
  {
    if (form.valid)
    {
      this.repository.registerUser(this.user).subscribe(data => {
        if (data.success){
          this.auth.storeUserData(data.token, data.user);
          this.router.navigateByUrl('surveys/list');
        }else{
          this.errorMessage = 'Error registering user.';
          console.log(data.error);
        }
      });
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
