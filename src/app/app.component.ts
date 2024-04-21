import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './task';
import { TaskService } from './task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { take } from 'rxjs';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
    public tasks!: Task[];
    public editTask!: Task;
    public deleteTask!: Task;

    constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.getTasks();
  }

    // public getTasks(): void {
    //   this.taskService.getTasks().subscribe(
    //     (response: Task[]) => {
    //       this.tasks = response;
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //     }
    //   );
    // }

    public getTasks(): void {
      this.taskService.getTasks().subscribe({
        next: (response: Task[]) =>  this.tasks = response,
        error: (error: HttpErrorResponse) =>  alert(error.message)
        });
    }

    onAddTask(addForm: NgForm): void {
      document.getElementById('add-task-form')?.click();
        this.taskService.addTask(addForm.value).subscribe({
          next: (response: Task) => {
            console.log(response);
            this.getTasks();
            addForm.reset();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message)
            addForm.reset();
          }
        })
    }

    onUpdateTask(task: Task): void {
        this.taskService.updateTask(task).subscribe({
          next: (response: Task) => {
            console.log(response);
            this.getTasks();
          },
          error: (error: HttpErrorResponse) =>  alert(error.message)
        })
    }

    onDeleteTask(taskId: number): void {
      this.taskService.deleteTask(taskId).subscribe({
        next: (response: void) => {
          console.log(response);
          this.getTasks();
          document.getElementById('cancel-delete-task-form')?.click();
        },
        error: (error: HttpErrorResponse) =>  alert(error.message)
      })
  }

  public searchTasks(key: string): void {
    console.log(key);
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !key) {
      this.getTasks();
    }
  }


    OnOpenModal(task?: Task, mode?: string) : void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addTaskModal');
      }
      if (mode === 'edit') {
        if(task !== undefined){
          this.editTask = task;
        }
        button.setAttribute('data-target', '#updateTaskModal');
      }
      if (mode === 'delete') {
        if(task !== undefined){
          this.deleteTask = task;
        }
        button.setAttribute('data-target', '#deleteTaskModal');
      }
      container?.appendChild(button);
      button.click();
    }


}
