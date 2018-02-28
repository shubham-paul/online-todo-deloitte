import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Task} from "../entities/Task";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  getTasksForUser(userId:number): Observable<Task[]> {
    let url = environment.endPoint + '/tasks/'+userId;
    return this.http.get<Task[]>(url);
  }

  deleteTask(task:Task){
    let url = environment.endPoint + '/deleteTask';
    let authHeader = new HttpHeaders().set('Content-Type', 'application/json');
    authHeader = authHeader.set('charset', 'utf-8');
    let options = {headers:authHeader};
    return this.http.post(url, JSON.stringify(task) ,options);
  }

  saveTask(task: Task):Observable<string>{
    let url = environment.endPoint + '/saveTask';
    let authHeader = new HttpHeaders().set('Content-Type', 'application/json');
    authHeader = authHeader.set('charset', 'utf-8');
    let options = {headers:authHeader};
    return this.http.post<string>(url, JSON.stringify(task), options);
  }

  getTask(taskId:number): Observable<Task> {
    let url = environment.endPoint + '/task/'+taskId;
    return this.http.get<Task>(url);
  }

}
