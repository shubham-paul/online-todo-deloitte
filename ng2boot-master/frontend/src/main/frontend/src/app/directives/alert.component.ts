

import {Component} from "@angular/core";
import {AlertService} from "../services/AlertService";
import {AlertType} from "../models/AlertType";
import {ErrorMessageMap} from "../models/ErrorMessageMap";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'ngdb-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent {
  alertType: AlertType;
  isDismissible: boolean;
  message: any;
  hideAlert: boolean;


  constructor(private alertService: AlertService) {
    this.alertService.alertChange.subscribe((alert) => {
      if (!isNullOrUndefined(alert)) {
        this.alertType = alert.alertType;
        if (this.alertType === AlertType.WARNING ||
          this.alertType === AlertType.INFO ||
          this.alertType === AlertType.SUCCESS) {
          this.isDismissible = true;
          this.message = alert.status;
        } else {
          this.isDismissible = false;
          this.message = this.getAlertMessage(alert.status);
        }

        this.hideAlert = false;
      }
    });
  }

  /**
   * Gets the errorMessage based on the errorCode, from the ErrorMessageMap object
   * @param status
   * @returns {undefined|string}
   */
  getAlertMessage(status: number): string {
    return ErrorMessageMap.errorMap.get(status);
  }

  /**
   *  This function is used to close the alert when the user clicks on the X icon.
   */
  closeAlert(): void {
    this.hideAlert = true;
  }
}

