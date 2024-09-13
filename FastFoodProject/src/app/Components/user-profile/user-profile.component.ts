import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  userDetails: any = {}; // Initialize as an empty object
  isEditing: boolean = false;
  token: any;
  showMenu: boolean = false; // Sidebar state

  constructor(private router: Router) {
    this.userId = +localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.fetchUserDetails();
    this.token = localStorage.getItem('jwtToken');
  }

  async fetchUserDetails() {
    try {
      const response = await axios.get(`http://localhost:5270/api/user/${this.userId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.userDetails = response.data;
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  }

  editProfile() {
    this.isEditing = true;
  }

  async updateProfile() {
    try {
      await axios.put(`http://localhost:5270/api/user/${this.userId}`, this.userDetails, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.isEditing = false;
      await this.fetchUserDetails();
    } catch (error) {
      console.error('Error updating user profile', error);
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  async deleteProfile() {
    try {
      await axios.delete(`http://localhost:5270/api/user/${this.userId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error deleting user profile', error);
    }
  }

  showProfile() {
    this.router.navigate(['/user-profile']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/order-list']);
  }

  goToHome() {
    this.router.navigate(['/userdash']);
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }

  toggleSidebar() {
    this.showMenu = !this.showMenu;
  }
}
