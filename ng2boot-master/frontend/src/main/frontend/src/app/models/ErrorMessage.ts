
export class ErrorMessage {
  errorStatus: number;
  errorStatusMessage: string;

  constructor(status, message) {
    this.errorStatus = status;
    this.errorStatusMessage = message;
  }

  getErrorStatus(): number {
    return this.errorStatus;
  }

  getErrorMessage(): string {
    return this.errorStatusMessage;
  }
}
