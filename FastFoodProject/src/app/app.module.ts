import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ContactUsComponent } from './Components/contactus/contactus.component';
import { HomeComponent } from './Components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/user.service';
import { UserdashboardComponent } from './Components/userdashboard/userdashboard.component';
import { PizzaComponent } from './Components/pizza/pizza.component';
import { AdmindashboardComponent } from './Components/admindashboard/admindashboard.component';
import { ManageitemsComponent } from './Components/manageitems/manageitems.component';
import { FooditemformComponent } from './Components/fooditemform/fooditemform.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AboutusComponent,
    ContactUsComponent,
    HomeComponent,
    UserdashboardComponent,
    PizzaComponent,
    AdmindashboardComponent,
    ManageitemsComponent,
    FooditemformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
