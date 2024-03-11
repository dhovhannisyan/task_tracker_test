import { Pipe, PipeTransform } from '@angular/core';
import { TASK_PRIORITY } from '../models/enums/task-priority.enum';
import { Task } from '../models/interfaces/task.interface';

@Pipe({
  name: 'taskPriorityStyles',
  standalone: true
})
export class TaskPriorityStylesPipe implements PipeTransform {

  transform(task: Task): {[key: string]: boolean} {
    return {
      "bg-info": task.priority === TASK_PRIORITY.LOW,
      "bg-warn": task.priority === TASK_PRIORITY.MEDIUM,
      "bg-danger": task.priority === TASK_PRIORITY.HIGH,
    };
  }

}
