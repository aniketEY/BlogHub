import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // not sure
import { CookieService } from 'ngx-cookie-service'; // not sure
import { LoginRequest } from '../models/login-request.model'; // not sure

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.model = {
      email: '',
      password: ''
    };
  }

  doRegister(){
    alert('User is registered!');
    // this.router.navigateByUrl('/login');
  }


  onFormSubmit(): void {
    this.authService.register(this.model)
    .subscribe({
      next: (response) => {
        // Set Auth Cookie
        // alert('Set Auth Cookie');
        this.router.navigateByUrl('/login');

        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        // Set User
        alert('Set User');
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // Redirect back to Home
        alert('Redirect back to Home');
        this.router.navigateByUrl('/login');

      }
    });
  }


}
