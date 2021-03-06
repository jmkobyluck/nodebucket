// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: task service
// ;===========================================
// */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  /**
   * findAllTasks
   */
  findAllTasks(empId: string): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  /**
   * createTask
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task,
    });
  }

  /**
   * updateTask
   */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done,
    });
  }

  /**
   * deleteTask
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
