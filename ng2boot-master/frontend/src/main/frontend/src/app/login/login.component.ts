import { Component, OnInit } from '@angular/core';
import {User} from "../entities/User";
import {UserServiceService} from "../services/user-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../services/AlertService";
import {Router, ActivatedRoute} from "@angular/router";
import {Column} from "../models/Column";
import {UserUtil} from "../util/UserUtil"
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();



  constructor(private userService: UserServiceService,
              private alertService: AlertService,
              private router: Router,
              private toastr: ToastsManager,) { }

  ngOnInit() {


  }



  login(){
    this.userService.login(this.user).subscribe(
      (res: string) => {
        console.log("COMPONENT " + res);
        if(res != '-1'){
          this.router.navigate(['/home/'+res]);
          this.userService.getUser(parseInt(res, 10)).subscribe(
            (user:User) => {
              this.userService.setUser(user);
            },
            (err: HttpErrorResponse) => {
              this.alertService.error(err);
            }
          )

        }
        else{
          this.toastr.error('User Name or Password is invalid', 'Login Failed');
        }

      },
      (err: HttpErrorResponse) => {
        this.alertService.error(err);
      })
  }

}
