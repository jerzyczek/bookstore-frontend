import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import { SignupComponent } from './signup/signup.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminAuthorViewComponent } from './admin-author-view/admin-author-view.component';
import { AdminAuthorAddComponent } from './admin-author-add/admin-author-add.component';
import { AdminCategoryViewComponent } from './admin-category-view/admin-category-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { AdminCategoryAddComponent } from './admin-category-add/admin-category-add.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { AdminProductViewComponent } from './admin-product-view/admin-product-view.component';
import { AdminProductAddComponent } from './admin-product-add/admin-product-add.component';
import { UserOrderViewComponent } from './user-order-view/user-order-view.component';
import { UserAddressComponent } from './user-address/user-address.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    LoginComponent,
    UserViewComponent,
    SignupComponent,
    AdminViewComponent,
    AdminAuthorViewComponent,
    AdminAuthorAddComponent,
    AdminCategoryViewComponent,
    CategoryViewComponent,
    AdminCategoryAddComponent,
    CartViewComponent,
    AdminProductViewComponent,
    AdminProductAddComponent,
    UserOrderViewComponent,
    UserAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
