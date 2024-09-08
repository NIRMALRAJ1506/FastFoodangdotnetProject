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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFoodItems();
  }

  async loadFoodItems() {
    try {
      const response = await axios.get('http://localhost:5270/api/fooditems');
      this.foodItems = response.data;
      this.filteredItems = this.foodItems;
      this.extractFoodTypes();
    } catch (error) {
      console.error('Error loading food items', error);
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

  orderNow(item: any) {
    this.selectedItem = item;
    this.createOrder(item);
  }

  async createOrder(item: any) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const orderCreateModel = {
        orderNumber: `ORD-${new Date().getTime()}`, // Generate a unique order number
        totalPrice: item.price,
        orderTime: new Date().toISOString(),
        status: 'Pending',
        userId: userId,
        foodItemIds: [item.id] // Only pass the FoodItem ID
      };

      const response = await axios.post('http://localhost:5270/api/order', orderCreateModel, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Order created successfully', response.data); // Log response
      this.router.navigate(['/order-confirmation', response.data.id]);
    } catch (error) {
      console.error('Error creating order', error);
      alert('Failed to create order. Please try again.');
    }
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

  goToOrders() {
    this.router.navigate(['/order-list']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
    localStorage.removeItem('userId'); // Clear userId from localStorage on logout
    localStorage.removeItem('cart'); // Clear cart from localStorage on logout
    this.router.navigate(['/home']);
  }
}
