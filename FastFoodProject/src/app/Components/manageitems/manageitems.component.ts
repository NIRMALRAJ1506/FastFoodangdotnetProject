import { Component } from '@angular/core';

@Component({
  selector: 'app-manageitems',
  templateUrl: './manageitems.component.html',
  styleUrls: ['./manageitems.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class ManageitemsComponent {
  showMenu = false;
  fastFoodItems = [
    { name: 'Burger', link: '/admin/manage-items/burger' },
    { name: 'Pizza', link: '/pizza' },
    { name: 'Fries', link: '/admin/manage-items/fries' }
  ]; // Add fast food item links here

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
