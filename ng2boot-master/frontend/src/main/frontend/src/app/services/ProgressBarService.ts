import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ProgressBarService implements OnInit {
  progressValue: number;
  showProgressBar: boolean;
  progressValueChange: Subject<number> = new Subject<number>();
  showProgressBarChange: Subject<boolean> = new Subject<boolean>()

  ngOnInit() {
    this.showProgressBar = false;
  }

  startProgress(): void {
    this.showProgressBar = true;
    this.showProgressBarChange.next(this.showProgressBar);
    this.progressValue = 0;
    setInterval(() => {
      if (this.progressValue <= 97) {
        this.progressValue++;
        this.progressValueChange.next(this.progressValue);
      }
    }, 100)
  }

  endProgress(): void {
    this.progressValue = 100;
    this.progressValueChange.next(this.progressValue);
    this.showProgressBar = false;
    this.showProgressBarChange.next(this.showProgressBar);
  }
}
