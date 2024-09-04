import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios, { AxiosError } from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fooditemform',
  templateUrl: './fooditemform.component.html',
  styleUrls: ['./fooditemform.component.css']
})
export class FooditemformComponent implements OnInit {
  foodItemForm: FormGroup;
  itemId: number | null = null;
  foodType: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.foodItemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      ImgUrl: ['', Validators.required], // Ensure this field is required
      foodType: ['']  // Initialize with empty string
    });
  }

  ngOnInit(): void {
    this.itemId = +this.route.snapshot.paramMap.get('id')!;
    this.foodType = this.route.snapshot.queryParamMap.get('type') || '';

    if (this.itemId) {
      // Editing an existing item
      this.fetchFoodItem();
    } else {
      // Initializing form with the provided food type
      this.foodItemForm.patchValue({ foodType: this.foodType });
    }
  }

  private async fetchFoodItem() {
    try {
      const response = await axios.get(`http://localhost:5270/api/fooditems/${this.itemId}`);
      this.foodItemForm.patchValue(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error while fetching food item:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else if (error instanceof Error) {
        console.error('Generic error while fetching food item:', error.message);
      } else {
        console.error('Unexpected error while fetching food item:', error);
      }
    }
  }

  async onSubmit() {
    if (this.foodItemForm.valid) {
      console.log('Form data:', this.foodItemForm.value);  // Check if foodType is present
      try {
        if (this.itemId) {
          // Update existing item
          await axios.put(`http://localhost:5270/api/fooditems/${this.itemId}`, this.foodItemForm.value);
        } else {
          // Add new item
          await axios.post('http://localhost:5270/api/fooditems', this.foodItemForm.value);
        }
        this.router.navigate(['/pizza']); // Redirect to the pizza page or wherever appropriate
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error while saving food item:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
        } else if (error instanceof Error) {
          console.error('Generic error while saving food item:', error.message);
        } else {
          console.error('Unexpected error while saving food item:', error);
        }
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
