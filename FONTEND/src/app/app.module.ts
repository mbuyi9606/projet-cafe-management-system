import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedComponent } from './shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsComponentComponent } from './materials-component/materials-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BestSellerComponent,
    LayoutComponent,
    SharedComponent,
    MaterialsComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
