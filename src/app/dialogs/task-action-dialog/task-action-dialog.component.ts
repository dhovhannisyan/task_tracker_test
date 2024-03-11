import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/interfaces/user.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, filter, first, map, of, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store/app.reducers';
import * as TasksSelectors  from '../../store/tasks-store/tasks.selectors';
import * as TasksActions  from '../../store/tasks-store/tasks.actions';
import * as UsersSelectors  from '../../store/users-store/users.selectors';
import { TASK_PRIORITY } from '../../models/enums/task-priority.enum';
import { TASK_STATUS } from '../../models/enums/task-status.enum';
import { FullnamePipe } from '../../pipes/fullname.pipe';
import { TaskDialogData } from '../../models/interfaces/task-dialog-data';
import { TASK_DIALOG_ACTION } from '../../models/enums/task-dialog-action.enum';
import { Task } from '../../models/interfaces/task.interface';
import { CustomValidators } from '../../helpers/custom-validators';


@Component({
  selector: 'app-task-action-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FullnamePipe,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  templateUrl: './task-action-dialog.component.html',
  styleUrl: './task-action-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskActionDialogComponent implements OnInit {

  taskActionLoading$: Observable<boolean> = this.store.select(TasksSelectors.actionTaskLoading);

  form: FormGroup;

  taskPriorityOptions: TASK_PRIORITY[] = [
    TASK_PRIORITY.LOW,
    TASK_PRIORITY.MEDIUM,
    TASK_PRIORITY.HIGH
  ];

  taskStatusOptions: TASK_STATUS[] = [
    TASK_STATUS.ON_TRACK,
    TASK_STATUS.OFF_TRACK,
    TASK_STATUS.AT_RISK
  ];

  users$: Observable<User[]> = this.store.select(UsersSelectors.usersList);
  filteredUsers$: Observable<User[]>;
  selectedTask$: Observable<Task> = this.store.select(TasksSelectors.selectedTask);


  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
              private fb: FormBuilder,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<TaskActionDialogComponent>,) {}

  ngOnInit() {
    this.initForm();
    if (this.data.action === TASK_DIALOG_ACTION.EDIT) {
      this.selectedTask$.pipe(first()).subscribe(task => {
        this.form.patchValue(task);
      });
    }
    this.filteredUsers$ = this.form.get('assignee').valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.users$.pipe(map((users: User[]) => this.filterUsers(name, users))) : this.users$;
      })
    );
  }

  displayUsersAutocompleteFn(user: User): string {
    return user && user.name ? user.name + ' ' + user.lastname : '';
  }

  private filterUsers(name: string, users: User[]): User[] {
    const filterValue = name.toLowerCase();
    return users.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    const assignee = this.form.get('assignee').value;
    if (this.form.valid && (assignee instanceof Object)) {
      if (this.data.action === TASK_DIALOG_ACTION.ADD) {
        const { id, ...task } = this.form.getRawValue();
        this.store.dispatch(TasksActions.addTaskStart({ task }));
      }
      if (this.data.action === TASK_DIALOG_ACTION.EDIT) {
        const task  = this.form.getRawValue();
        this.store.dispatch(TasksActions.editTaskStart({ task }));
      }
      this.taskActionLoading$.pipe().subscribe(loading => {
        if (!loading) {
          this.closeDialog();
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: [null, Validators.required],
      assignee: [null, [Validators.required, CustomValidators.isTypeOfUser]]
    });
  }

}
