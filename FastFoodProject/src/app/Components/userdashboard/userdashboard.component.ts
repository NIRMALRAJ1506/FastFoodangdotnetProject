import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  foodItems: any[] = [];
  filteredItems: any[] = [];
  foodTypes: string[] = [];
  selectedFoodType: string | null = null;
  showMenu: boolean = false;
  selectedItem: any;
  token: string | null = null;
  loading: boolean = true;
  error: string | null = null;
  isModalVisible: boolean = false; // Control modal visibility

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('jwtToken');

    if (this.token) {
      this.loadFoodItems();
    } else {
      this.handleTokenError();
    }
  }

  async loadFoodItems() {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.get('http://localhost:5270/api/fooditems', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      
      this.foodItems = response.data;
      this.filteredItems = this.foodItems;
      this.extractFoodTypes();
    } catch (error) {
      this.handleApiError(error, 'Error loading food items');
    } finally {
      this.loading = false;
    }
  }

  extractFoodTypes() {
    const types = new Set(this.foodItems.map(item => item.foodType));
    this.foodTypes = Array.from(types);
  }

  filterItemsByType(type: string | null) {
    this.selectedFoodType = type;
    this.filteredItems = type ? this.foodItems.filter(item => item.foodType === type) : this.foodItems;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getImageUrl(imageName: string): string {
    return `${imageName}`;
  }

  // Opens the modal when "Order Now" is clicked
  openOrderModal(item: any) {
    this.selectedItem = item; // Store the selected item
    this.isModalVisible = true; // Show the modal
  }

  // Proceed with the order when "Yes" is clicked
  async proceedToPayment() {
    if (!this.selectedItem) {
      this.error = 'No item selected for order.';
      return;
    }
  
    // Pass the selected item information to the payment page
    localStorage.setItem('selectedFoodItem', JSON.stringify(this.selectedItem));
  
    // Redirect to payment page
    this.router.navigate(['/payment']);
  }
  

  addToCart(item: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
  }

  showProfile() {
    this.router.navigate(['/user-profile']);
  }

  private handleApiError(error: any, context: string) {
    if (axios.isAxiosError(error)) {
      console.error(`${context}:`, error.response?.data || error.message);
      this.error = `${context}. Please try again later.`;
    } else {
      console.error('Unexpected error:', error);
      this.error = 'Unexpected error. Please try again later.';
    }
  }

  private handleTokenError() {
    console.error('No JWT token found');
    this.error = 'Authentication error. Please log in again.';
    this.loading = false;
    this.router.navigate(['/login']); // Redirect to login page
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/order-list']);
  }

  cancelPayment(){
    this.router.navigate(['/userdash']);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('cart');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
