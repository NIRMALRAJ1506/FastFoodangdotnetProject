import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  roles = ['User', 'Admin']; // Dropdown options

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required] // Add role control
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      try {
        if (formData.role === 'Admin') {
          const response = await this.userService.loginAdmin(formData);
          console.log('Admin login successful', response);
          // Handle successful admin login here (e.g., redirect to admin dashboard)
          this.router.navigate(['/admindash']);
        } else {
          const response = await this.userService.loginUser(formData);
          console.log('User login successful', response);
          // Handle successful user login here (e.g., redirect to user dashboard)
          this.router.navigate(['/userdash']);
        }
      } catch (error) {
        console.error('Error during login', error);
        // Handle login error here (e.g., show error message)
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
