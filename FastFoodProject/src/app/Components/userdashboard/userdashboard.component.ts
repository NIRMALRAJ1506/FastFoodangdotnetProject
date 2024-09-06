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
    console.log('Ordering item:', item);
    // Implement order logic here
  }

  addToCart(item: any) {
    console.log('Adding item to cart:', item);
    // Implement add to cart logic here
  }

  logout() {
    // Perform logout logic here
    this.router.navigate(['/home']);
  }
}
