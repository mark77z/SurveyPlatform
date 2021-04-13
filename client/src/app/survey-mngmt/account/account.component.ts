import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/model/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserRepository } from '../../model/user.repository';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    public user: User;
    public errorMessage: string;
    public username: string;

    constructor(private router: Router, private authService: AuthService, private repository: UserRepository) {
        const result = this.authService.authenticated;
        if (result) {
            this.username = JSON.parse(localStorage.getItem('user')).username;
            this.user = this.repository.getUserByUsername(this.username);
        }
    }

    updateProfile(form: NgForm): void {
        if (form.valid) {
            this.repository.updateUser(this.username, this.user).subscribe(data => {
                if (data.success) {
                    Swal.fire(
                        'Profile Update',
                        'Your profile has been update successfully',
                        'success'
                    );

                    this.router.navigate(['/account/' + this.username])
                        .then(() => {
                            window.location.reload();
                        });
                } else {
                    Swal.fire(
                        'Profile Update',
                        'An error ocurred while updating ypur profile. Please try again later.',
                        'error'
                    );
                }
            });
        }
        else {
            this.errorMessage = 'Form Data Invalid';
        }
    }
}