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
  token:any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.fetchOrderDetails(orderId);
    } else {
      console.error('No order ID found in the route parameters');
    }
    this.token=localStorage.getItem('jwtToken');
  }

  async fetchOrderDetails(orderId: string) {
    try {
      const response = await axios.get(`http://localhost:5270/api/order/${orderId}`,{
        headers:{
          'Authorization':`Bearer ${this.token}`
        }
      });
      console.log('API Response:', response); // Log full response object
      console.log('API Response Data:', response.data); // Log raw data
  
      // Map response data to extract only required fields
      this.orderDetails = {
        id: response.data.id,
        orderNumber: response.data.orderNumber,
        totalPrice: response.data.totalPrice,
        status: response.data.status
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error headers:', error.response?.headers);
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error type:', error);
      }
    }
  }
  
  
  

  goBack() {
    this.router.navigate(['/userdash']); // Navigate to the user dashboard or any desired route
  }
}
