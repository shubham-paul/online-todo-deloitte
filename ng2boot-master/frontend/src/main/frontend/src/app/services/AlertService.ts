
import {Injectable, ViewContainerRef} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {AlertType} from "../models/AlertType";
import {ErrorMessage} from "../models/ErrorMessage";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsManager} from "ng2-toastr";
import {ErrorMessageMap} from "../models/ErrorMessageMap";

@Injectable()
export class AlertService {
  private keepAfterNavigationChange = false;
  alertChange: Subject<any> = new Subject<any>();

  constructor(private router: Router,
              private toastr: ToastsManager) {
    //this.toastr.setRootViewContainerRef(vcr);
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.alertChange.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alertChange.next({alertType: AlertType.SUCCESS, status: message});
  }

  error(err: HttpErrorResponse) {
    this.keepAfterNavigationChange = false;
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('A Client Side error occurred:', err.error.message);
      errorMessage = err.error.message;
      //this.toastr.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
      let error = ErrorMessageMap.errorMap.get(err.status);
      console.log(error);
      if(error !== undefined)
        errorMessage = error;
      else
        errorMessage = err.status + ' ' + err.error.exception;
    }

    this.toastr.error('LOGIN FAILED', errorMessage, {dismiss: 'click'});
    this.alertChange.next({alertType: AlertType.ERROR, status: errorMessage});
  }
}
