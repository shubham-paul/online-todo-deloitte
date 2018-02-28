/**
 * Created by shubhampaul on 2/27/2018.
 */


/**
 * Created by shubhampaul on 2/25/2018.
 */

export class TaskProjection {
  taskId: number;
  taskName: string;
  description: string;
  lastUpdated: string;
  taskStatus: boolean;


  constructor(taskId: number, taskName: string, description: string, lastUpdated: string, taskStatus: boolean) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.description = description;
    this.lastUpdated = lastUpdated;
    this.taskStatus = taskStatus;
  }
}

