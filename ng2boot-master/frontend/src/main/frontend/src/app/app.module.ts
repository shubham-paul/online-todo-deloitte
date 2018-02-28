import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import { AppComponent } from './app.component';
import {TableComponent} from "./directives/table.component";
import {GridBarComponent} from "./directives/gridbar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbdPaginationBasic} from "./directives/pagination.component";
import {ProgressBarService} from "./services/ProgressBarService";
import {PaginationService} from "./services/PaginationService";
import {ToastModule, ToastOptions} from "ng2-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {routing} from "./app.routing";
import { TaskViewComponent } from './Tasks/task-view/task-view.component';
import { TaskComponent } from './Tasks/task/task.component';
import { LoginComponent } from './login/login.component';
import {UserServiceService} from "./services/user-service.service";
import {TaskServiceService} from "./services/task-service.service";
import {AlertService} from "./services/AlertService";
import {CustomToastOptions} from "./util/CustomToastOptions";
import {UserUtil} from "./util/UserUtil";


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    GridBarComponent,
    NgbdPaginationBasic,
    TaskViewComponent,
    TaskComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [PaginationService,
    ProgressBarService,
    UserServiceService,
    TaskServiceService,
    AlertService,
    ErrorHandler,
    UserUtil,
    {provide: ToastOptions, useClass: CustomToastOptions}],
  bootstrap: [AppComponent]
})
export class AppModule { }
