import {Component, OnInit} from '@angular/core';
import {ProgressBarService} from "../services/ProgressBarService";
import {NgbProgressbarConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'xfd-progressbar',
  templateUrl: './progressbar.component.html',
  providers: [NgbProgressbarConfig]
})
export class NgbdProgressbar implements OnInit {
  progressValue: number;
  striped: boolean;
  showProgressBar: boolean;

  constructor(private progressBarService: ProgressBarService,
              private config: NgbProgressbarConfig) {
    config.max = 100;
    config.animated = true;
    this.showProgressBar = false;

    this.progressBarService.progressValueChange.subscribe((progress) => {
      this.progressValue = progress;
    });

    this.progressBarService.showProgressBarChange.subscribe((show) => {
      this.showProgressBar = show;
    });
  }

  ngOnInit() {
    this.progressValue = 0;
    this.striped = true;
  }
}
