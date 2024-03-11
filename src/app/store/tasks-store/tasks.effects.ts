import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as TasksActions  from './tasks.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TasksService } from '../../services/tasks.service';
import { AppState } from '../../store/app-store/app.reducers';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private alertService: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // Get All Tasks
  getAllTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.getAllTasksStart),
    mergeMap((action) => this.tasksService.getTaskList()
        .pipe(
          map(data => {
            return TasksActions.getAllTasksSuccess({ taskList: data });
          }),
          catchError(err => {
            // this.notificationService.alertError(err.error.message);
            return of(TasksActions.getAllTasksFailure({ error: err.error }));
          })
        )
    ))
  );
  // Add Task
  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.addTaskStart),
    mergeMap((action) => this.tasksService.addTask(action.task)
        .pipe(
          map(data => {
            this.alertService.showSuccess('Task was successfuly added!');
            return TasksActions.addTaskSuccess({ task: data });
          }),
          catchError(err => {
            this.alertService.showError('Something went wrong');
            return of(TasksActions.addTaskFailure({ error: err.error }));
          })
        )
    ))
  );
   // Get Task By ID
   getTaskById$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.getTaskByIdStart),
    mergeMap((action) => this.tasksService.getTaskById(action.taskId)
        .pipe(
          map(data => {
            return TasksActions.getTaskByIdSuccess({ task: data });
          }),
          catchError(err => {
            this.router.navigateByUrl('/tasks');
            return of(TasksActions.getTaskByIdFailure({ error: err.error }));
          })
        )
    ))
  );
 // Edit Task
 editTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.editTaskStart),
    mergeMap((action) => this.tasksService.updateTaskById(action.task)
        .pipe(
          map(data => {
            this.alertService.showSuccess('Task was successfuly updated!');
            return TasksActions.editTaskSuccess({ task: data });
          }),
          catchError(err => {
            this.alertService.showError('Something went wrong');
            return of(TasksActions.editTaskFailure({ error: err.error }));
          })
        )
    ))
  );
  // Delete Task
  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.deleteTaskStart),
    mergeMap((action) => this.tasksService.deleteTaskById(action.taskId)
        .pipe(
          map(data => {
            this.alertService.showSuccess('Task was successfuly deleted!');
            this.router.navigateByUrl('/tasks')
            return TasksActions.deleteTaskSuccess({ task: data });
          }),
          catchError(err => {
            this.alertService.showError('Something went wrong');
            return of(TasksActions.deleteTaskFailure({ error: err.error }));
          })
        )
    ))
  );
  // Task Filter Applyed
  taskFilterApply$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.taskFilterApplyed),
    map(data => {
      this.router.navigateByUrl('/tasks')
      return TasksActions.taskSortApplyedSuccess();
    }),
  ))

}
