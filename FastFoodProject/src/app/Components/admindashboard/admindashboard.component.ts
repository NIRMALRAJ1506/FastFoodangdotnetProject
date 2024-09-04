import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  showMenu = false;
  fastFoodItems = [
    { name: 'Manage Orders', link: '/admin/manage-orders' },
    { name: 'Manage Items', link: '/manageitems' },
    { name: 'View Reports', link: '/admin/view-reports' }
  ]; // Add or modify menu items as needed

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
