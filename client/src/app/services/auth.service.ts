import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
// import "rxjs/add/operator/map";
// import "rxjs/Rx";
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';


import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  oldproduct: any;
  role: any;
  iteml: any;
  totall: any;
  courseName: any;

  constructor(private http: Http) { }
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiBaseUrl + '/users/register', user, { headers: headers })
      .pipe(map(res => res.json()));
  };
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiBaseUrl + '/users/authenticate', user, { headers: headers })
    .pipe(map(res => res.json()));
  }

  getIndividualCourseAllDetails(courseName) {
    let headers = new Headers();

    // console.log(courseName);
    
    // this.loadToken();

    // headers.append('Authorization', this.authToken);
    
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiBaseUrl + '/users/course/' + courseName, courseName)
    .pipe(map(res => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiBaseUrl + '/users/profile', { headers: headers })
    .pipe(map(res => res.json()));
  }

  getProducts() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get('users/product', { headers: headers })
    .pipe(map(res => res.json()));
  }

  addProduct(product) {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiBaseUrl + '/users/addproduct', product, { headers: headers })
    .pipe(map(res => res.json()));
  }

  editProduct(product) {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiBaseUrl + '/users/editproduct', product, { headers: headers })
    .pipe(map(res => res.json()));
  }


  deleteProduct(productID) {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(environment.apiBaseUrl + '/users/deleteproduct/' + productID, { headers: headers })
    .pipe(map(res => res.json()));
  }



  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.authToken = token;
    this.user = user;
    this.role = user.role;
  }

  storeProductData(product1: any) {
    this.oldproduct = product1;

  }

  storeItemToOrder(item: any) {

    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));

  }


  updateItemsInOrder(items: any) {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
  }
  getOrderFromItems() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));
  }

  orderClear() {
    localStorage.removeItem("items");
    localStorage.removeItem("item");
  }
  getProductData() {
    return this.oldproduct;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  getUser() {
    return this.user;
  }

  getOrder() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));;
  }
  storeTotal(total: any) {
    this.totall = total;
  }

  getTotal() {
    return this.totall;
  }
  itemslenth() {
    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem.length > 0) {
      return true;
    }
    else
      return false;
  }

  userRole() {
    const role = localStorage.getItem('role');
    if (role == 'admin')
      return true;
    else
      return false;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
