import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/interfaces/task.interface';
import { TASK_STATUS } from '../models/enums/task-status.enum';
import { User } from '../models/interfaces/user.interface';
import { TaskFilterData } from '../models/interfaces/task-filter-data.interface';

@Pipe({
  name: 'taskFilter',
  standalone: true
})
export class TaskFilterPipe implements PipeTransform {

  transform(taskList: Task[], filter: TaskFilterData): Task[] {
    const filteredTasksByDeadline = this.filterByDeadline(taskList, filter.deadline);
    const filteredTasksByStatus = this.filterByStatus(filteredTasksByDeadline, filter.status);
    const filteredTasksByAssignee = this.filterByAssignee(filteredTasksByStatus, filter.assignee);
    return filteredTasksByAssignee;
  }

  filterByDeadline(taskList: Task[], deadline: Date) {
    if (!deadline) return taskList;
    return taskList.filter(task => new Date(task.deadline) <= deadline);
  }

  filterByStatus(taskList: Task[], status: TASK_STATUS) {
    if (!status) return taskList;
    return taskList.filter(task => task.status === status);
  }

  filterByAssignee(taskList: Task[], assignee: User) {
    if (!assignee) return taskList;
    return taskList.filter(task => task.assignee.id === assignee.id);
  }

}
