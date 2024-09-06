import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  showMenu = false;
  totalItems: number = 0;
  totalUsers: number = 0;
  chart: any;

  fastFoodItems = [
    { name: 'Manage Items', link: '/manageitems' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchItemCount();
    this.fetchUserCount();
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

  // Fetch number of users from API and update the chart
  async fetchUserCount() {
    try {
      const response = await axios.get('http://localhost:5270/api/User/total');
      this.totalUsers = response.data;
      this.createUserChart();
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  }

  createUserChart() {
    // Check if the code is running in a browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const canvas = document.getElementById('userChart') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (this.chart) {
          this.chart.destroy(); // Clear any existing chart
        }
        this.chart = new Chart(ctx!, {
          type: 'bar',
          data: {
            labels: ['Total Users'],
            datasets: [
              {
                label: 'Users',
                data: [this.totalUsers],
                backgroundColor: ['#42A5F5'],
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }

  logout() {
    this.router.navigate(['/home']);
  }
}
