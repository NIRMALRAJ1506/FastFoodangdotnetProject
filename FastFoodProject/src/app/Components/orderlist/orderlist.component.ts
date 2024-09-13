import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  userOrders: any[] = [];
  token: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.token = localStorage.getItem('jwtToken');
    if (this.token) {
      this.fetchUserOrders(); // Fetch orders only if the token is available
    } else {
      console.error('No JWT token found');
      // Handle scenario when no token is available (e.g., redirect to login)
    }
  }

  async fetchUserOrders() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      if (this.isTokenExpired(this.token)) {
        console.error('Token expired');
        return;
      }

      const response = await axios.get(`http://localhost:5270/api/order/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.userOrders = response.data;
    } catch (error) {
      console.error('Error fetching user orders', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('Unauthorized access - Token might be invalid');
      }
    }
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }

  downloadBill(orderId: number) {
    // Retrieve the order details for the specific order
    const order = this.userOrders.find(o => o.id === orderId);
    if (!order) {
      console.error('Order not found');
      return;
    }

    // Create a new PDF document
    const doc = new jsPDF();

    // Add the shop logo (Make sure to have a valid image URL or base64 data)
    const logoUrl = '/assets/images/logo.JPG';  // Replace with your actual logo path
    const imgWidth = 50; // Adjust the logo width
    const imgHeight = 30; // Adjust the logo height
    doc.addImage(logoUrl, 'JPEG', 20, 10, imgWidth, imgHeight); // Position the logo at (20, 10)

    // Add some space after the logo for text
    const startingY = 50; // Adjust based on logo height

    doc.setFontSize(16);
    doc.text('Order Confirmation', 20, startingY);

    doc.setFontSize(12);
    doc.text(`Order Number: ${order.orderNumber}`, 20, startingY + 10);
    doc.text(`Total Price: $${order.totalPrice}`, 20, startingY + 20);
    doc.text(`Order Time: ${order.orderTime}`, 20, startingY + 30);
    doc.text(`Status: ${order.status}`, 20, startingY + 40);

    doc.text('Items Ordered:', 20, startingY + 50);
    
    // Add the items, ensuring proper spacing between them
    order.orderItems.forEach((item: any, index: number) => {
      const yPosition = startingY + 60 + index * 20; // Adjust item spacing as needed
      doc.text(`Item Name: ${item.name}`, 20, yPosition);
      doc.text(`Price: $${item.price}`, 20, yPosition + 10);
    });

    // Save the PDF with the order number in the filename
    doc.save(`Order_${order.orderNumber}.pdf`);
  }
}
