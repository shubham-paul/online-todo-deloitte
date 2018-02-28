import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProgressBarService} from "../../services/ProgressBarService";
import {isNullOrUndefined} from "util";
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../services/AlertService";
import {TaskServiceService} from "../../services/task-service.service";
import {Task} from "../../entities/Task";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {UserServiceService} from "../../services/user-service.service";
import {User} from "../../entities/User";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  taskToSave: Task;
  taskIdParam: number;
  showForm: boolean;
  taskForm: FormGroup;
  userIdParam:number;

  constructor(private activatedRoute: ActivatedRoute,
              private progressiveService: ProgressBarService,
              private router: Router,
              private formBuilder: FormBuilder,
              private vcr: ViewContainerRef,
              private toastr: ToastsManager,
              private alertService: AlertService,
              private taskService: TaskServiceService,
              private userService: UserServiceService) {

    this.toastr.setRootViewContainerRef(vcr);

    this.taskToSave = new Task();

    this.createForm();

    this.activatedRoute.params.subscribe(param => {
      this.userIdParam=param.userId;

      if(!isNullOrUndefined(param.taskId)){
        this.loadTask(param.taskId);
      }
      else{
        this.userService.getUser(this.userIdParam)
          .subscribe(
            (res: User) => {
              this.taskToSave.user = res;
            }, (err: HttpErrorResponse) => {
              console.log(err);
              this.alertService.error(err);
              setTimeout(this.navigateToLogin, 2000);
            }
          );
      }

      this.showForm = true;

    });

    this.taskForm.valueChanges.debounceTime(100)
      .subscribe((data) => {
        let taskData = data.task;
        if(!isNullOrUndefined(taskData)){
          this.taskToSave.taskName = taskData.taskName;
          this.taskToSave.description = taskData.Description;
        }
      });


  }

  ngOnInit() {

  }


  createForm() {
    this.taskForm = this.formBuilder.group({
      task: this.formBuilder.group({
        taskName: ['', [Validators.required, Validators.maxLength(100)]],
        Description: ['', [Validators.maxLength(500)]]
      })
    });
  }

  loadTask(taskId: number): void {
    this.progressiveService.startProgress();
    this.taskService.getTask(taskId)
      .subscribe(
        (res: Task) => {
          this.setTaskFormValue(res);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.alertService.error(err);
          setTimeout(this.navigateToLogin, 2000);
        }
      );
  }


  setTaskFormValue(response: Task): void {
    this.taskToSave.copy(response);
    this.taskForm.get('task').setValue({
      taskName: this.taskToSave.taskName,
      Description: this.taskToSave.description
    });
  }

  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

  onSubmit(){
    console.log(this.taskToSave);
    this.taskToSave.lastUpdated = new Date();
    this.taskService.saveTask(this.taskToSave)
      .subscribe(
        (res: string) => {
          console.log("COMPONENT " + res);
          this.router.navigate(['home/'+this.userIdParam+'/task/' + res]);
          this.toastr.success('SAVED', 'Task');
        },
        (err: HttpErrorResponse) => {
          this.alertService.error(err);
          setTimeout(this.navigateToLogin, 2000);
        }
      );
  }




}
