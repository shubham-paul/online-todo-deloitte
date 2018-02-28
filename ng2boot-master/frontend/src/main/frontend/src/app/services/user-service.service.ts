import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../entities/User";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class UserServiceService {

  currentUser: User;
  userChange: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient,
              private router: Router) { }

  login(user: User) {
    let url = environment.endPoint + '/login';
    let authHeader = new HttpHeaders().set('Content-Type', 'application/json');
    authHeader = authHeader.set('charset', 'utf-8');
    let options = {headers:authHeader};
    return this.http.post(url, JSON.stringify(user) ,options);
  }

  getUser(userId: number) {
    let url = environment.endPoint + '/user/'+userId;
    return this.http.get<User>(url);
  }

  setUser(user:User){
    this.currentUser = user;
    this.userChange.next(this.currentUser);
  }

  logOut(){
    this.userChange.next(new User());
    this.navigateToLogin();
  }

  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

}
