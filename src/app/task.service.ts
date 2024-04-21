import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiServerUrl}/task/all`);
  }

  public addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.apiServerUrl}/task/add`,task);
  }

  public updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiServerUrl}/task/update`,task);
  }

  public deleteTask(taskId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/task/delete/${taskId}`);
  }

}
