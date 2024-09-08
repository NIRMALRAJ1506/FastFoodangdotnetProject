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
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validate contact number
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // Ensure role is required
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const registrationObservable = formData.role === 'Admin' 
        ? this.userService.registerAdmin(formData) 
        : this.userService.registerUser(formData);

      registrationObservable
        .then(response => {
          console.log(`${formData.role} registration successful`, response);
          this.signupForm.reset(); // Reset form after successful submission
        })
        .catch(error => {
          console.error(`Error during ${formData.role} registration`, error);
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
