// signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service'; // Adjust the path according to your project structure

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  roles = ['User', 'Admin']; // Dropdown options

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validate contact number
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // Add role control
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      if (formData.role === 'Admin') {
        this.userService.registerAdmin(formData)
          .then(response => {
            console.log('Admin registration successful', response);
          })
          .catch(error => {
            console.error('Error during admin registration', error);
          });
      } else {
        this.userService.registerUser(formData)
          .then(response => {
            console.log('User registration successful', response);
          })
          .catch(error => {
            console.error('Error during user registration', error);
          });
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
