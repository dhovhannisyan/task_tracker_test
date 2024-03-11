import { Injectable } from '@angular/core';
import { Task } from '../models/interfaces/task.interface';
import { Observable, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() {}

  private get taskList (): Task[] {
    const taskList = localStorage.getItem('taskList');
    if (taskList) {
      return (JSON.parse(taskList) as Task[]);
    } else {
      return [];
    }
  }

  private set taskList (taskList: Task[]) {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }
  // Get All Tasks
  getTaskList(): Observable<Task[]> {
    return of(this.taskList).pipe(delay(500));
  }
  // Get Task By Id
  getTaskById(taskId: string): Observable<Task> {
    const task = this.taskList.find(task => task.id === taskId);
    if (task) {
      return of(task).pipe(delay(500));
    } else {
      console.log('throw error');

      return throwError(new Error('Task not found')).pipe(delay(500));
    }
  }
  // Add Task
  addTask(task: Task): Observable<Task> {
    task = { ... task };
    task.id = Date.now().toString();
    const taskList = this.taskList;
    taskList.push(task);
    this.taskList = taskList;
    return of(task).pipe(delay(500));
  }
  // Update Task
  updateTaskById(task: Task): Observable<Task> {
    const taskList = [...this.taskList];
    const taskFound = taskList.find(t => t.id === task.id);
    if (taskFound) {
      const index = taskList.indexOf(taskFound);
      console.log(index);
      taskList[index] = task;
      this.taskList = taskList;
      return of(task).pipe(delay(500));
    } else {
      return throwError(new Error('Task not found')).pipe(delay(500));
    }
  }
  // Delete Task
  deleteTaskById(taskId: string): Observable<Task> {
    let taskList = [...this.taskList];
    const taskFound = taskList.find(t => t.id === taskId);
    if (taskFound) {
      taskList = taskList.filter(t => t.id !== taskFound.id);
      this.taskList = taskList;
      return of(taskFound).pipe(delay(500));
    } else {
      return throwError(new Error('Task not found')).pipe(delay(500));
    }
  }

}
