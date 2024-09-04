import { Component } from '@angular/core';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  showMenu = false;

  // Example Fast Food items
  fastFoodItems = [
    { name: 'Burger', link: '/burger' },
    { name: 'Pizza', link: '/pizza' },
    { name: 'Pasta', link: '/pasta' },
    { name: 'Sandwich', link: '/sandwich' },
  ];

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
