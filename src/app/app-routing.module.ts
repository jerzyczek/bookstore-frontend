import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserViewComponent} from './user-view/user-view.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AdminViewComponent} from './admin-view/admin-view.component';
import {AdminGuard} from './admin.guard';
import {AdminAuthorViewComponent} from './admin-author-view/admin-author-view.component';
import {AdminAuthorAddComponent} from './admin-author-add/admin-author-add.component';
import {AdminCategoryViewComponent} from './admin-category-view/admin-category-view.component';
import {AdminCategoryAddComponent} from './admin-category-add/admin-category-add.component';
import {CategoryViewComponent} from './category-view/category-view.component';
import {CartViewComponent} from './cart-view/cart-view.component';
import {AdminProductViewComponent} from './admin-product-view/admin-product-view.component';
import {AdminProductAddComponent} from './admin-product-add/admin-product-add.component';
import {UserOrderViewComponent} from './user-order-view/user-order-view.component';
import {UserAddressComponent} from './user-address/user-address.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: UserViewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'category', component: CategoryViewComponent},
  {path: 'cart', component: CartViewComponent},
  {path: 'admin', component: AdminViewComponent, canActivate: [AdminGuard]},
  {path: 'admin/authors', component: AdminAuthorViewComponent, canActivate: [AdminGuard]},
  {path: 'admin/authors/add', component: AdminAuthorAddComponent, canActivate: [AdminGuard]},
  {path: 'admin/category', component: AdminCategoryViewComponent, canActivate: [AdminGuard]},
  {path: 'admin/category/add', component: AdminCategoryAddComponent, canActivate: [AdminGuard]},
  {path: 'admin/product', component: AdminProductViewComponent, canActivate: [AdminGuard]},
  {path: 'admin/product/add', component: AdminProductAddComponent, canActivate: [AdminGuard]},
  {path: 'orders', component: UserOrderViewComponent},
  {path: 'address', component: UserAddressComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
