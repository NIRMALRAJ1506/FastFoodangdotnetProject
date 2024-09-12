import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  userOrders: any[] = [];
  token: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.token = localStorage.getItem('jwtToken');
    if (this.token) {
      this.fetchUserOrders(); // Fetch orders only if the token is available
    } else {
      console.error('No JWT token found');
      // Handle scenario when no token is available (e.g., redirect to login)
    }
  }

  async fetchUserOrders() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      // Check if the token is expired before making the request
      if (this.isTokenExpired(this.token)) {
        console.error('Token expired');
        // Handle token refresh or prompt user to log in again
        return;
      }

      const response = await axios.get(`http://localhost:5270/api/order/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.userOrders = response.data;
      console.log('User orders fetched successfully:', this.userOrders);
    } catch (error) {
      console.error('Error fetching user orders', error);
      // Handle specific error cases
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('Unauthorized access - Token might be invalid');
        // Handle unauthorized access (e.g., redirect to login)
      }
    }
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }
}
