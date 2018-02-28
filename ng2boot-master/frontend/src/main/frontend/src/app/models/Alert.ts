import {AlertType} from "./AlertType";


export class Alert {
  type: AlertType;
  message: string;

  constructor(alertType, alertMessage) {
    this.type = alertType;
    this.message = alertMessage;
  }

  getAlertType(): AlertType {
    return this.type;
  }

  getAlertMessage(): string {
    return this.message;
  }
}
