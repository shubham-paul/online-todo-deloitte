import {User} from "./User";
/**
 * Created by shubhampaul on 2/25/2018.
 */

export class Task {
  taskId: number;
  user: User;
  taskName: string;
  description: string;
  lastUpdated: Date;
  taskStatus: boolean;

  constructor() {
    this.taskId = -1;
    this.user = new User();
    this.taskName = '';
    this.description = '';
    this.lastUpdated = new Date();
    this.taskStatus = false;
  }

  copy(task:Task) {
    this.taskId = (task.taskId !== undefined) ? task.taskId : this.taskId;;
    this.user = task.user;
    this.taskName = task.taskName;
    this.description = task.description;
    this.lastUpdated = task.lastUpdated;
    this.taskStatus = task.taskStatus;
  }
}
