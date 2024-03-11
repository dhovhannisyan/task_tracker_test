import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/interfaces/task.interface';
import { compareByDateFn } from '../helpers/utils';
import { SORT_OPTION } from '../models/enums/sort-option.emum';
import { TaskSortData } from '../models/interfaces/task-sort-data.interface';

@Pipe({
  name: 'taskSort',
  standalone: true
})
export class TaskSortPipe implements PipeTransform {

  transform(taskList: Task[], sort: TaskSortData): Task[] {
    const taskListCopy = [...taskList];
    const sortedDasksByDeadline = this.sortByDeadline(taskListCopy, sort.deadline);
    const sortedDasksByStatus= this.sortByStatus(sortedDasksByDeadline, sort.status);
    const sortedDasksByAssignee = this.sortByAssignee(sortedDasksByStatus, sort.assignee);
    return sortedDasksByAssignee;
  }

  sortByDeadline(taskList: Task[], sort: SORT_OPTION) {
    if (!sort) return taskList;
    taskList.sort(compareByDateFn('deadline'));
    return sort === SORT_OPTION.ASCENDING ? taskList : taskList.reverse();
  }

  sortByStatus(taskList: Task[], sort: SORT_OPTION) {
    if (!sort) return taskList;
    taskList.sort((a, b) => {
      const statusPriority = {
        'Et risk': 1,
        'Off Track': 2,
        'On Track': 3
      };
      const priorityA = statusPriority[a.status];
      const priorityB = statusPriority[b.status];
      return priorityA - priorityB;
    });
    return sort === SORT_OPTION.ASCENDING ? taskList : taskList.reverse();
  }

  sortByAssignee(taskList: Task[], sort: SORT_OPTION) {
    if (!sort) return taskList;
    taskList.sort((a, b) => {
      const nameA = a.assignee.name.toLowerCase();
      const nameB = b.assignee.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sort === SORT_OPTION.ASCENDING ? taskList : taskList.reverse();
  }

}
