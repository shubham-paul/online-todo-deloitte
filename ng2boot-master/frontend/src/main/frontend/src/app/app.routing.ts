import {RouterModule, Routes} from "@angular/router";
import {TaskViewComponent} from "./Tasks/task-view/task-view.component";
import {TaskComponent} from "./Tasks/task/task.component";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  {path: 'home/:userId', component: TaskViewComponent},
  {path: 'home/:userId/task', component: TaskComponent},
  {path: 'home/:userId/task/:taskId', component: TaskComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
