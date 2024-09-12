import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: any;
  token: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('jwtToken');
    
    if (!this.token) {
      console.error('No JWT token found');
      // Handle scenario when no token is available (e.g., redirect to login)
      this.router.navigate(['/login']);
      return;
    }

    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.fetchOrderDetails(orderId);
    } else {
      console.error('No order ID found in the route parameters');
      // Handle scenario where order ID is missing (e.g., redirect to an error page)
      this.router.navigate(['/error']);
    }
  }

  async fetchOrderDetails(orderId: string) {
    try {
      if (this.isTokenExpired(this.token)) {
        console.error('Token expired');
        // Handle token refresh or prompt user to log in again
        this.router.navigate(['/login']);
        return;
      }

      const response = await axios.get(`http://localhost:5270/api/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      console.log('API Response:', response); // Log full response object
      console.log('API Response Data:', response.data); // Log raw data

      // Map response data to extract only required fields
      this.orderDetails = {
        id: response.data.id,
        orderNumber: response.data.orderNumber,
        totalPrice: response.data.totalPrice,
        status: response.data.status,
        orderItems: response.data.orderItems // Include order items if needed
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error headers:', error.response?.headers);
        if (error.response?.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          this.router.navigate(['/login']);
        }
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error type:', error);
      }
    }
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }

  goBack() {
    this.router.navigate(['/userdash']); // Navigate to the user dashboard or any desired route
  }
}
