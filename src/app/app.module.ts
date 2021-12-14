import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagingService } from './messaging.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CustombotComponent } from './custombot/custombot.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    AdminComponent,
    NavbarComponent,
    CustombotComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MessagingService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
