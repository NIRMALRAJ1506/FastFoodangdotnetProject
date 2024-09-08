import axios, { AxiosError } from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5270/api'; // Adjust the base URL as needed

  constructor() {}

  // Helper function to check if error is an AxiosError
  private isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
  }

  // Registration Methods
  registerUser(userData: any) {
    return axios.post(`${this.apiUrl}/user/register`, userData)
      .then(response => response.data)
      .catch((error: any) => {
        if (this.isAxiosError(error)) {
          console.error('Error during user registration', error.response?.data || error.message);
        } else {
          console.error('Unexpected error during user registration', error);
        }
        throw error;
      });
  }

  registerAdmin(adminData: any) {
    return axios.post(`${this.apiUrl}/admin/register`, adminData)
      .then(response => response.data)
      .catch((error: any) => {
        if (this.isAxiosError(error)) {
          console.error('Error during admin registration', error.response?.data || error.message);
        } else {
          console.error('Unexpected error during admin registration', error);
        }
        throw error;
      });
  }

  // Login Methods
  loginUser(credentials: { username: string; password: string }) {
    return axios.post(`${this.apiUrl}/user/login`, credentials)
      .then(response => {
        // Store the userId in localStorage
        const { userId } = response.data;
        localStorage.setItem('userId', userId);
        return response.data;
      })
      .catch((error: any) => {
        if (this.isAxiosError(error)) {
          console.error('Error during user login', error.response?.data || error.message);
        } else {
          console.error('Unexpected error during user login', error);
        }
        throw error;
      });
  }

  loginAdmin(credentials: { username: string; password: string }) {
    return axios.post(`${this.apiUrl}/admin/login`, credentials)
      .then(response => {
        // Store the userId in localStorage
        const { userId } = response.data;
        localStorage.setItem('userId', userId);
        return response.data;
      })
      .catch((error: any) => {
        if (this.isAxiosError(error)) {
          console.error('Error during admin login', error.response?.data || error.message);
        } else {
          console.error('Unexpected error during admin login', error);
        }
        throw error;
      });
  }

  // Fetch user details
  async getUserDetails(userId: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/user/${userId}`);
      return response.data;
    } catch (error: any) {
      if (this.isAxiosError(error)) {
        console.error('Error fetching user details', error.response?.data || error.message);
      } else {
        console.error('Unexpected error fetching user details', error);
      }
      throw error;
    }
  }

  // Update user details
  async updateUser(userId: number, updatedData: any) {
    try {
      await axios.put(`${this.apiUrl}/user/${userId}`, updatedData);
    } catch (error: any) {
      if (this.isAxiosError(error)) {
        console.error('Error updating user details', error.response?.data || error.message);
      } else {
        console.error('Unexpected error updating user details', error);
      }
      throw error;
    }
  }
}
