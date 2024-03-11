import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AppState } from '../../store/app-store/app.reducers';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import * as TasksSelectors  from '../../store/tasks-store/tasks.selectors';
import * as TasksActions  from '../../store/tasks-store/tasks.actions';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TaskDialogData } from '../../models/interfaces/task-dialog-data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './delete-task-dialog.component.html',
  styleUrl: './delete-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DeleteTaskDialogComponent {

  taskActionLoading$: Observable<boolean> = this.store.select(TasksSelectors.actionTaskLoading);

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
              public dialogRef: MatDialogRef<DeleteTaskDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close(false);
  }

  deleteTask() {
    this.store.dispatch(TasksActions.deleteTaskStart({ taskId: this.data.task.id }));
    this.taskActionLoading$.pipe().subscribe(loading => {
      if (!loading) {
        this.closeDialog();
      }
    });
  }

}
