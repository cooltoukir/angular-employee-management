import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { APIResponseModel } from '../../model/interface/role';
import { LoginRequest } from '../../model/interface/loginRequest';
import { Router } from '@angular/router';
import { AlertComponent } from "../../reusableComponents/alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordFieldType: string = 'password';
  isLoader: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginRequest = {
        emailId: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.isLoader = true;

      this.authService.login(loginData).subscribe({
        next: (response: APIResponseModel) => {
          if (response.result) {
            const token = response.data.token;
            // Store token (e.g., in localStorage)
            localStorage.setItem('authToken', token);
            // Navigate to a different page or perform other actions
            this.router.navigateByUrl('master');
          } else {
            console.error('Login failed:', response.message);
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
        },
        complete: () => {
          this.isLoader = false;
          console.log('Request complete.');
        }
      });

      // Clear the form after submission
      this.loginForm.reset();
    }
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
