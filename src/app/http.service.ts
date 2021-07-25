import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {UserDetails} from './model/user-details';
import {Token} from './model/token';
import {LoginForm} from './forms/login';
import {ApiError} from './model/apiError';
import {SignUp} from './forms/sign-up';
import {AuthorDetails} from './model/author';
import {AuthorForm} from './forms/author-form';
import {CategoryDetails} from './model/category';
import {CategoryForm} from './forms/category-form';
import {Product} from './model/product';
import {OrderRowRequest} from './model/order-row-request';
import {CartDetails} from './model/cart-details';
import {ShippingMethod} from './model/shipping-method';
import {Order} from './model/order';
import {ProductForm} from './forms/product-form';
import {OrderDetails} from './model/order-details';
import {Address} from './forms/address';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly apiURL;
  private readonly USER_RESOURCE = '/user';
  private readonly LOGIN_RESOURCE = '/login';
  private readonly SIGNUP_RESOURCE = '/sign-up';
  private readonly AUTHORS_RESOURCE = '/admin/authors';
  private readonly AUTHOR_RESOURCE = '/admin/author';
  private readonly CATEGORIES_RESOURCE = '/admin/categories';
  private readonly CATEGORY_RESOURCE = '/admin/category';
  private readonly CATEGORIES_RESOURCE_PAGE = '/categories';
  private readonly PRODUCTS_FOR_CATEGORY = '/category/products';
  private readonly CART_ADD = '/user/cart';
  private readonly SHIPPING_METHOD = '/user/cart/shipping';
  private readonly ORDER = '/user/order';
  private readonly PRODUCTS_ADMIN_RESOURCE = '/admin/products';
  private readonly PRODUCT_ADMIN_RESOURCE = '/admin/product';
  private readonly PRODUCTS_MAIN_PAGE = '/products';

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiUrl;
  }

  static extractErrorMessage(error: HttpErrorResponse): string {
    const msg = error.error as ApiError;
    return msg.messages[0].message;
  }

  postLoginForm(form: LoginForm): Observable<Token> {
    return this.httpClient.post<Token>(`${this.apiURL}${this.LOGIN_RESOURCE}`, form);
  }


  postSignUpForm(form: SignUp): Observable<UserDetails> {
    return this.httpClient.post<UserDetails>(`${this.apiURL}${this.SIGNUP_RESOURCE}`, form);
  }

  getUserDetails(): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(`${this.apiURL}${this.USER_RESOURCE}/me`);
  }

  getAuthors(): Observable<AuthorDetails[]> {
    return this.httpClient.get<AuthorDetails[]>(`${this.apiURL}${this.AUTHORS_RESOURCE}`);
  }

  getAuthor(authorId: number): Observable<AuthorDetails> {
    return this.httpClient.get<AuthorDetails>(`${this.apiURL}${this.AUTHOR_RESOURCE}`,
      {params: new HttpParams().set('authorId', authorId.toString())});
  }

  removeAuthor(authorId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}${this.AUTHOR_RESOURCE}`,
      {params: new HttpParams().set('authorId', authorId.toString())});
  }

  postAuthor(form: AuthorForm): Observable<AuthorDetails> {
    return this.httpClient.post<AuthorDetails>(`${this.apiURL}${this.AUTHOR_RESOURCE}`, form);
  }

  putAuthor(form: AuthorForm): Observable<AuthorDetails> {
    return this.httpClient.put<AuthorDetails>(`${this.apiURL}${this.AUTHOR_RESOURCE}`, form);
  }

  getCategories(): Observable<CategoryDetails[]> {
    return this.httpClient.get<CategoryDetails[]>(`${this.apiURL}${this.CATEGORIES_RESOURCE}`);
  }

  removeCategory(categoryName: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}${this.CATEGORY_RESOURCE}`,
      {params: new HttpParams().set('categoryName', categoryName)});
  }

  getCategoriesForNav(): Observable<CategoryDetails[]> {
    return this.httpClient.get<CategoryDetails[]>(`${this.apiURL}${this.CATEGORIES_RESOURCE_PAGE}`);
  }

  saveCategory(form: CategoryForm): Observable<CategoryDetails> {
    return this.httpClient.post<CategoryDetails>(`${this.apiURL}${this.CATEGORY_RESOURCE}`, form);
  }

  getProductsForCategory(categoryName: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiURL}${this.PRODUCTS_FOR_CATEGORY}`,
      {params: new HttpParams().set('categoryName', categoryName)});
  }

  addToCart(orderRow: OrderRowRequest): Observable<OrderRowRequest> {
    return this.httpClient.post<OrderRowRequest>(`${this.apiURL}${this.CART_ADD}`, orderRow);
  }

  getCart(): Observable<CartDetails> {
    return this.httpClient.get<CartDetails>(`${this.apiURL}${this.CART_ADD}`);
  }

  removeOrderRow(orderRowId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}${this.CART_ADD}`,
      {params: new HttpParams().set('orderRowId', orderRowId.toString())});
  }

  getShippingMethod(): Observable<ShippingMethod[]> {
    return this.httpClient.get<ShippingMethod[]>(`${this.apiURL}${this.SHIPPING_METHOD}`);
  }

  saveOrder(order: Order): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}${this.ORDER}`, order);
  }

  getProductsAdmin(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiURL}${this.PRODUCTS_ADMIN_RESOURCE}`);
  }

  removeProduct(productId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}${this.PRODUCT_ADMIN_RESOURCE}`,
      {params: new HttpParams().set('productId', productId.toString())});
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiURL}${this.PRODUCT_ADMIN_RESOURCE}`,
      {params: new HttpParams().set('productId', productId.toString())});
  }

  saveProduct(form: ProductForm) {
    return this.httpClient.post<Product>(`${this.apiURL}${this.PRODUCT_ADMIN_RESOURCE}`, form);
  }

  getProductsMainPage(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiURL}${this.PRODUCTS_MAIN_PAGE}`);
  }

  getOrder(): Observable<OrderDetails[]> {
    return this.httpClient.get<OrderDetails[]>(`${this.apiURL}${this.ORDER}`);
  }

  saveAddress(form: Address): Observable<UserDetails> {
    return this.httpClient.post<UserDetails>(`${this.apiURL}${this.USER_RESOURCE}/address`, form);
  }
}
