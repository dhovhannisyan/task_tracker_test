import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store/app.reducers';
import { Observable } from 'rxjs';
import { Task } from '../../models/interfaces/task.interface';
import * as TasksSelectors  from '../../store/tasks-store/tasks.selectors';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskActionDialogComponent } from '../../dialogs/task-action-dialog/task-action-dialog.component';
import { UserAvatarComponent } from '../../shared/user-avatar/user-avatar.component';
import { TaskDialogData } from '../../models/interfaces/task-dialog-data';
import { TASK_DIALOG_ACTION } from '../../models/enums/task-dialog-action.enum';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { TaskSortComponent } from '../../components/task-sort/task-sort.component';
import { TaskFilterPipe } from '../../pipes/task-filter.pipe';
import { TaskSortPipe } from '../../pipes/task-sort.pipe';
import { TaskFilterData } from '../../models/interfaces/task-filter-data.interface';
import { TaskSortData } from '../../models/interfaces/task-sort-data.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserAvatarComponent,
    TaskFilterComponent,
    TaskSortComponent,
    TaskFilterPipe,
    TaskSortPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  taskList$: Observable<Task[]>;
  filter$: Observable<TaskFilterData> = this.store.select(TasksSelectors.taskFilter);
  sort$: Observable<TaskSortData> = this.store.select(TasksSelectors.taskSort);

  constructor(private store: Store<AppState>,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.taskList$ = this.store.select(TasksSelectors.taskList);
  }

  openAddTaskDialog() {
    const dialogData: TaskDialogData = { action: TASK_DIALOG_ACTION.ADD }
      const dialogRef = this.dialog.open(TaskActionDialogComponent, { data: dialogData });
  }

}
