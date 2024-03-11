import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TASK_STATUS } from '../../models/enums/task-status.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as UsersSelectors  from '../../store/users-store/users.selectors';
import { Observable, first } from 'rxjs';
import { User } from '../../models/interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store/app.reducers';
import { FullnamePipe } from '../../pipes/fullname.pipe';
import * as TasksSelectors  from '../../store/tasks-store/tasks.selectors';
import * as TasksActions  from '../../store/tasks-store/tasks.actions';
import { SORT_OPTION } from '../../models/enums/sort-option.emum';
import { TaskSortData } from '../../models/interfaces/task-sort-data.interface';

@Component({
  selector: 'app-task-sort',
  standalone: true,
  imports: [
    CommonModule,
    FullnamePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-sort.component.html',
  styleUrl: './task-sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSortComponent implements OnInit, AfterViewInit {

  sortForm: FormGroup;

  users$: Observable<User[]> = this.store.select(UsersSelectors.usersList);
  sort$: Observable<TaskSortData> = this.store.select(TasksSelectors.taskSort);
  applyedSortsCount$: Observable<number> = this.store.select(TasksSelectors.taskApplyedSortsCount);

  @ViewChild('menu') matMenu: MatMenu;

  sortOptions: SORT_OPTION[] = [
    SORT_OPTION.ASCENDING,
    SORT_OPTION.DESCENDING
  ];

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,) {}

  ngOnInit() {
    this.initSortForm();
    this.sort$.pipe(first()).subscribe(sortData => this.sortForm.patchValue(sortData));
  }

  ngAfterViewInit() {
    this.matMenu.closed.subscribe(res => {
      this.sort$.pipe(first()).subscribe(sortData => this.sortForm.patchValue(sortData));
    });
  }

  initSortForm() {
    this.sortForm = this.fb.group({
      deadline: null,
      status: null,
      assignee: null
    })
  }

  onSortApply() {
    const sort = this.sortForm.getRawValue();
    this.store.dispatch(TasksActions.taskSortApplyed({ sort }))
  }
}
