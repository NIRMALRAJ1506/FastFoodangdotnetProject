import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-manageitems',
  templateUrl: './manageitems.component.html',
  styleUrls: ['./manageitems.component.css']
})
export class ManageitemsComponent implements OnInit {
  foodItems: any[] = [];
  filteredItems: any[] = [];
  foodTypes: string[] = [];
  selectedFoodType: string | null = null;
  showAddItemForm: boolean = false;
  editingItem: any = null; // For editing existing items
  token:any;

  // Model for new or editing item
  newItem: any = {
    name: '',
    description: '',
    price: 0.0,
    imageUrl: '',
    foodType: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFoodItems();
    this.token=localStorage.getItem('jwtToken');
  }

  async loadFoodItems() {
    try {
      const response = await axios.get('http://localhost:5270/api/fooditems',{
        headers:{
          'Authorization':`Bearer ${this.token}`
        }
      });
      this.foodItems = response.data;
      console.log(this.foodItems)
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

  // Toggle the Add/Edit form
  toggleAddItemForm(editingItem: any = null) {
    this.showAddItemForm = !this.showAddItemForm;
    if (editingItem) {
      this.editingItem = editingItem;
      this.newItem = { ...editingItem };
    } else {
      this.editingItem = null;
      this.resetForm();
    }
  }

  // Add or Update Item
  async addOrUpdateItem() {
    try {
      if (this.editingItem) {
        await axios.put(`http://localhost:5270/api/fooditems/${this.editingItem.id}`, this.newItem,{
          headers:{
            'Authorization':`Bearer ${this.token}`
          }
        });
        console.log('Item updated successfully');
      } else {
        console.log(this.newItem)
        const response = await axios.post('http://localhost:5270/api/FoodItems', {
          "id": 0,
          "name": this.newItem.name,
          "description": this.newItem.description,
          "price": this.newItem.price,
          "imgUrl": this.newItem.imageUrl,
          "foodType": this.newItem.foodType
        },{
          headers:{
            'Authorization':`Bearer ${this.token}`
          }
        });
        console.log('Item added successfully:', response);
        this.foodItems.push(response.data); // Add new item to the list
      }
      
      this.showAddItemForm = false;
      this.loadFoodItems(); // Reload food items after adding/updating
      this.resetForm(); // Clear the form

    } catch (error) {
      console.error('Error adding/updating item:', error);
    }
  }

  // Delete Item
  async deleteItem(id: number) {
    try {
      await axios.delete(`http://localhost:5270/api/fooditems/${id}`,{
        headers:{
          'Authorization':`Bearer ${this.token}`
        }
      });
      console.log('Item deleted successfully');
      this.loadFoodItems(); // Reload food items after deletion
    } catch (error) {
      console.error('Error deleting food item', error);
    }
  }
  getImageUrl(imageName: string): string {
    return `${imageName}`;
  }

  // Reset form data
  resetForm() {
    this.newItem = {
      id:0,
      name: '',
      description: '',
      price: 0.0,
      imageUrl: '',
      foodType: ''
    };
    this.editingItem = null;
  }
  logout() {
    // Perform logout logic here, e.g., clearing session storage or authentication tokens
    // Redirect to the home page
    this.router.navigate(['/home']);
  }
}
