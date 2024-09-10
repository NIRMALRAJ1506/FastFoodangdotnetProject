import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  userOrders: any[] = [];
  token:any;

  constructor() {}

  ngOnInit(): void {
    this.fetchUserOrders();
    this.token=localStorage.getItem('jwtToken');
  }

  async fetchUserOrders() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5270/api/order/user/${userId}`,{
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
      });
      this.userOrders = response.data;
      console.log('User orders fetched successfully:', this.userOrders);
    } catch (error) {
      console.error('Error fetching user orders', error);
    }
  }
}
