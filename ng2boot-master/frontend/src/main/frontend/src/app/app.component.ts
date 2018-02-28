import {Component, ViewContainerRef, OnInit} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {UserServiceService} from "./services/user-service.service";
import {User} from "./entities/User";
import {UserUtil} from "./util/UserUtil";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAnonymous: boolean = true;
  currentUser:User = new User();

  constructor(private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private userService: UserServiceService,
              private userUtil: UserUtil){
    this.toastr.setRootViewContainerRef(vcr);
    this.userService.userChange.subscribe((user) => {
      this.currentUser = user;
      this.isAnonymous = (user.userName === '') ? true : false;
    });


  }

  ngOnInit(){

  }

  logout(){
    this.userService.logOut();
  }

}
