import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ContactUsComponent } from './Components/contactus/contactus.component';
import { HomeComponent } from './Components/home/home.component';
import { UserdashboardComponent } from './Components/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './Components/admindashboard/admindashboard.component';
import { ManageitemsComponent } from './Components/manageitems/manageitems.component';
import { PizzaComponent } from './Components/pizza/pizza.component';
import { FooditemformComponent } from './Components/fooditemform/fooditemform.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AdminOrderConfirmComponent } from './Components/admin-order-confirm/admin-order-confirm.component';
import { OrderConfirmationComponent } from './Components/order-confirmation/order-confirmation.component';
import { OrderlistComponent } from './Components/orderlist/orderlist.component';
import { ManageUsersComponent } from './Components/manage-users/manage-users.component';
import { CartComponent } from './Components/cart/cart.component';
import { FeedbacksComponent } from './Components/feedbacks/feedbacks.component';

const routes: Routes = [ 
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
{path:"signup",component:SignupComponent},
{path:"aboutus",component:AboutusComponent},
{path:"contactus",component:ContactUsComponent},
{path:"userdash",component:UserdashboardComponent},
{path:"admindash",component:AdmindashboardComponent},
{path:"manageitems",component:ManageitemsComponent},
{ path: 'add-food-item', component: FooditemformComponent },
{ path: 'update-food-item/:id', component: FooditemformComponent },
{path:'pizza',component:PizzaComponent},
{path:'user-profile',component:UserProfileComponent},
{path:'manageorders',component:AdminOrderConfirmComponent},
{path:'order-confirmation/:id',component:OrderConfirmationComponent},
{path:'order-list',component:OrderlistComponent},
{path:'manageusers',component:ManageUsersComponent},
{path:'cart',component:CartComponent},
{path:'feedbacks',component:FeedbacksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
