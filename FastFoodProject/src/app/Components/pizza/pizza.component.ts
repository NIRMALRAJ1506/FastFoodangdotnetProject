import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  pizzaItems: any[] = [];
  foodType: string = 'Pizza'; // Directly set to 'Pizza'

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPizzaItems();
  }

  async loadPizzaItems() {
    try {
      const response = await axios.get('http://localhost:5270/api/fooditems', {
        params: { type: this.foodType } // This will append ?type=Pizza to the URL
      });
      this.pizzaItems = response.data;
    } catch (error) {
      console.error('Error loading pizza items', error);
    }
  }
  

  navigateToAddFoodItem() {
    this.router.navigate(['/add-food-item'], { queryParams: { type: this.foodType } });
  }

  navigateToUpdateFoodItem(id: number) {
    this.router.navigate(['/update-food-item', id]);
  }

  async deleteFoodItem(id: number) {
    try {
      await axios.delete(`http://localhost:5270/api/fooditems/${id}`);
      this.loadPizzaItems(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting pizza item', error);
    }
  }
}
