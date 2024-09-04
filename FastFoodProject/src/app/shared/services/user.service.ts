import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5270/api'; // Adjust the base URL as needed

  constructor() {}

  // Registration Methods
  registerUser(userData: any) {
    return axios.post(`${this.apiUrl}/user/register`, userData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error during user registration', error);
        throw error;
      });
  }

  registerAdmin(adminData: any) {
    return axios.post(`${this.apiUrl}/admin/register`, adminData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error during admin registration', error);
        throw error;
      });
  }

  // Login Methods
  loginUser(credentials: { username: string; password: string }) {
    return axios.post(`${this.apiUrl}/user/login`, credentials)
      .then(response => response.data)
      .catch(error => {
        console.error('Error during user login', error);
        throw error;
      });
  }

  loginAdmin(credentials: { username: string; password: string }) {
    return axios.post(`${this.apiUrl}/admin/login`, credentials)
      .then(response => response.data)
      .catch(error => {
        console.error('Error during admin login', error);
        throw error;
      });
  }
}
