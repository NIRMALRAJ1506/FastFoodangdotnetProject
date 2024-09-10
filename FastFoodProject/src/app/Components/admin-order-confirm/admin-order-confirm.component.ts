import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin-order-confirm',
  templateUrl: './admin-order-confirm.component.html',
  styleUrls: ['./admin-order-confirm.component.css']
})
export class AdminOrderConfirmComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error: string | null = null;
  token:any;

  ngOnInit(): void {
    this.loadOrders();
    this.token=localStorage.getItem('jwtToken');
  }

  async loadOrders() {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get('http://localhost:5270/api/order',{
        headers:{
          'Authorization':`Bearer ${this.token}`
        }
      }); // Ensure this API endpoint is correct
      
      console.log('API Response:', response.data); // Log API response for debugging

      this.orders = response.data;
    } catch (error) {
      this.error = 'Error loading orders. Please try again later.';
      console.error('Error loading orders:', error);
    } finally {
      this.loading = false;
    }
  }

  async updateOrderStatus(orderId: number, status: string) {
    try {
      await axios.put(`http://localhost:5270/api/order/${orderId}`, { status }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await this.loadOrders(); // Reload orders after update
    } catch (error) {
      console.error('Error updating order:', error);
      this.error = 'Error updating order. Please try again later.';
    }
  }
}
