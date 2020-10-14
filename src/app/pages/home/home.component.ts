  // /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: home page
// ;===========================================
// */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DriverProvider } from 'protractor/built/driverProviders';
import { Employee } from 'src/app/shared/employee.interface';
import { Item } from 'src/app/shared/item.interface';
import { TaskService } from 'src/app/shared/task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // tasks: any;
  todo: Item[];
  done: Item[];
  employee: Employee;

  empId: string;

  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = this.cookieService.get('session_user'); // get the active session user

    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log(`--Server response from findAllTasks--`);
        console.log(res);
        this.employee = res.data;

        console.log(`--Employee object--`);
        console.log(this.employee);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;

        console.log(`--This is the complete function--`);
        console.log(this.todo);
        console.log(this.done);
      }
    );
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log(`Reordered the existing list of task items`);

      this.updateTaskList(this.empId, this.todo, this.done);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log(`Moved task item to the container`);

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(
      (res) => {
        this.employee = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    );
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(
          (res) => {
            console.log(res);
            console.log(data);

            this.employee = res.data;
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log(this.employee.todo);
            console.log(this.employee.done);

            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }
  deleteTask(taskId: string) {
    if (taskId) {
      console.log(`Task item: ${taskId} was deleted`);
      console.log(this.empId)

      this.taskService.deleteTask(this.empId, taskId).subscribe(
        (res) => {
          this.employee = res.data;
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        }
      );
    }
  }
}
