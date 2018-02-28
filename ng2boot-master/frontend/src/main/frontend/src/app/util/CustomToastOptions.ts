import {ToastOptions} from "ng2-toastr";

export class CustomToastOptions extends ToastOptions {
  toastLife: number = 2000;
  showCloseButton: boolean = true;
  maxShown:number = 3;
  positionClass: string = 'toast-top-right';
  animate:string = 'fade';
}
