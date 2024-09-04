import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

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
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      foodType: [this.foodType, Validators.required]
    });
  }

  async ngOnInit() {
    this.itemId = +this.route.snapshot.paramMap.get('id')!;
    this.foodType = this.route.snapshot.queryParamMap.get('type') || '';

    if (this.itemId) {
      try {
        const response = await axios.get(`http://localhost:5270/api/fooditems/${this.itemId}`);
        this.foodItemForm.patchValue(response.data);
      } catch (error) {
        console.error('Error fetching food item details', error);
      }
    } else {
      this.foodItemForm.patchValue({ foodType: this.foodType });
    }
  }

  async onSubmit() {
    if (this.foodItemForm.valid) {
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
        console.error('Error saving food item', error);
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
