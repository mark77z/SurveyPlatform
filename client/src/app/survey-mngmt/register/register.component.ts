import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepository } from '../../model/user.repository';
import { User } from '../../model/user.model';
import { AuthService } from '../../model/auth.service';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

          Swal.fire({
            title: 'Account created',
            html: 'You will be redirected to sign in...',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              this.router.navigateByUrl('/login');
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          });

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
