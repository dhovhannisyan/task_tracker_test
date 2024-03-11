import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/interfaces/task.interface';
import { TASK_STATUS } from '../models/enums/task-status.enum';

@Pipe({
  name: 'taskStatusStyles',
  standalone: true
})
export class TaskStatusStylesPipe implements PipeTransform {

  transform(task: Task): {[key: string]: boolean} {
    return {
      "bg-info": task.status === TASK_STATUS.ON_TRACK,
      "bg-warn": task.status === TASK_STATUS.OFF_TRACK,
      "bg-danger": task.status === TASK_STATUS.AT_RISK,
    };
  }

}
