import {Component, OnInit} from "@angular/core";
import {Column} from "../../models/Column";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/AlertService";
import {TaskServiceService} from "../../services/task-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsManager} from "ng2-toastr";
import {Task} from "../../entities/Task";
import {ErrorMessage} from "../../models/ErrorMessage";
import {TaskProjection} from "../../projections/TaskProjection";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  taskViewGridCols = [
    new Column('taskName', 'Task Name'),
    new Column('description', 'Task Description'),
    new Column('lastUpdated', 'Last Updated')
  ]

  userId: number;
  private sub: any;
  routerLinked: string;
  taskViewData: Task[] = [];
  taskProjection: TaskProjection[] = [];


  constructor(private alertService: AlertService,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private taskService: TaskServiceService,
              private toastr: ToastsManager) { }

  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = +params['userId'];
    });
    this.routerLinked = 'home/'+this.userId+'/task/';
    this.loadGrid();
  }

  loadGrid(): void{
    this.taskService.getTasksForUser(this.userId)
      .subscribe(
        (res) => {
          this.taskProjection = [];
          this.taskProjection = this.loadTaskView(res);
          this.toastr.success('LOADED', 'Tasks');
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(["/login"]);
        }
      )
  }

  loadTaskView(response: Task[]): TaskProjection[] {
    let taskViewData: TaskProjection[] = [];
    let taskView = response;
    for(let task of taskView) {
      let lastUpdateMilli = task.lastUpdated;
      let a = new Date(lastUpdateMilli);

      let rowData = new TaskProjection(task.taskId, task.taskName, task.description,
        a.toDateString(), task.taskStatus);
      taskViewData.push(rowData);
    }
    return taskViewData;
  }

  deleteTask(row){
    let task = new Task();
    task.taskId = row.taskId;
    this.taskService.deleteTask(task)
      .subscribe((res) => {
          this.loadGrid();
          this.toastr.success('DELETED', 'Task');

      }, (err: ErrorMessage) => {
        console.log(err);
      });
  }

  navigateToCreate(){
    this.router.navigate([this.routerLinked]);
  }

  navigateToEdit(row){
    this.router.navigate([this.routerLinked + row.taskId]);
  }

  completeTask(row){
    this.taskService.getTask(row.taskId)
      .subscribe(
        (res: Task) => {
          let task:Task = res;
          if(task.taskStatus){
            task.taskStatus = false;
          }
          else{
            task.taskStatus = true;
          }
          this.taskService.saveTask(task)
            .subscribe(
              (res: string) => {
                console.log("COMPONENT " + res);
                this.loadGrid();
                this.toastr.success('Status Changed', 'Task');
              },
              (err: HttpErrorResponse) => {
                this.alertService.error(err);
                setTimeout(this.navigateToLogin, 2000);
              }
            );

        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.alertService.error(err);
          setTimeout(this.navigateToLogin, 2000);
        }
      );

  }

  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }


}
