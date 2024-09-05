import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  showMenu = false;
  totalItems: number = 0;
  totalOrders: number = 0;
  totalReports: number = 0;

  fastFoodItems = [
    { name: 'Manage Orders', link: '/admin/manage-orders' },
    { name: 'Manage Items', link: '/manageitems' },
    { name: 'View Reports', link: '/admin/view-reports' }
  ];

  constructor(private router: Router) {}


  ngOnInit() {
    this.fetchItemCount();
    this.fetchOrderCount();
    this.fetchReportCount();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // Fetch number of items from API
  async fetchItemCount() {
    try {
      const response = await axios.get('http://localhost:5270/api/FoodItems');
      this.totalItems = response.data.length;
    } catch (error) {
      console.error('Error fetching item count:', error);
    }
  }

  // Fetch number of orders (assuming you have an API for orders)
  async fetchOrderCount() {
    try {
      const response = await axios.get('http://localhost:5270/api/Orders');
      this.totalOrders = response.data.length;
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  }

  // Fetch number of reports (assuming you have an API for reports)
  async fetchReportCount() {
    try {
      const response = await axios.get('http://localhost:5270/api/Reports');
      this.totalReports = response.data.length;
    } catch (error) {
      console.error('Error fetching report count:', error);
    }
  }

  logout() {
    // Perform any logout operations
    // Redirect to home
    // this.router.navigate(['/home']);
    this.router.navigate(['/home']);
    
  }
}
