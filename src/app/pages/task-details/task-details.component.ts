import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as TasksSelectors  from '../../store/tasks-store/tasks.selectors';
import * as TasksActions  from '../../store/tasks-store/tasks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store/app.reducers';
import { Observable, first } from 'rxjs';
import { Task } from '../../models/interfaces/task.interface';
import { FullnamePipe } from '../../pipes/fullname.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TASK_DIALOG_ACTION } from '../../models/enums/task-dialog-action.enum';
import { TaskDialogData } from '../../models/interfaces/task-dialog-data';
import { TaskActionDialogComponent } from '../../dialogs/task-action-dialog/task-action-dialog.component';
import { DeleteTaskDialogComponent } from '../../dialogs/delete-task-dialog/delete-task-dialog.component';
import { TaskStatusStylesPipe } from '../../pipes/task-status-styles.pipe';
import { TaskPriorityStylesPipe } from '../../pipes/task-priority-styles.pipe';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FullnamePipe,
    TaskStatusStylesPipe,
    TaskPriorityStylesPipe,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent implements OnInit {

  taskId: string | undefined;

  testDate = new Date();

  selectedTask$: Observable<Task> = this.store.select(TasksSelectors.selectedTask);
  taskLoading$: Observable<boolean> = this.store.select(TasksSelectors.getTaskByIdLoading);

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.subscribeToRouteChange();
  }

  subscribeToRouteChange() {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id')!;
      this.store.dispatch(TasksActions.getTaskByIdStart({ taskId: this.taskId }))
    });
  }

  openEditTaskDialog() {
    const dialogData: TaskDialogData = { action: TASK_DIALOG_ACTION.EDIT }
    const dialogRef = this.dialog.open(TaskActionDialogComponent, { data: dialogData });
  }

  openDeleteTaskDialog() {
    this.selectedTask$.pipe(first()).subscribe(task => {
      const dialogData: TaskDialogData = { task }
      const dialogRef = this.dialog.open(DeleteTaskDialogComponent, { data: dialogData });
    });
  }

}
